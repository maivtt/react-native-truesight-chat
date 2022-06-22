import type { Dispatch, Reducer } from 'react';
import React from 'react';
import type { Observable, Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import type { Model, ModelFilter } from 'react3l-common';

const DEFAULT_TAKE = 10;

export enum LoadingStatus {
  INIT,
  PROGRESSING,
  SUCCESS,
  FAIL,
}

export interface ListData<T extends Model, TFilter extends ModelFilter> {
  refreshing: boolean;

  loading: LoadingStatus;

  filter: TFilter;

  list: Record<string, T[]>;

  total?: number;
}

export interface ListAction<
  T extends Model & { id?: number },
  TFilter extends ModelFilter,
  P extends keyof TFilter
> {
  type: Action;

  list?: T[];

  searchField?: P;

  searchType?: keyof TFilter[P];

  searchValue?: string;

  total?: number;

  newFilter?: TFilter;

  item?: T;

  take?: number;
}

export enum Action {
  setList,
  resetList,
  searchList,
  refreshList,
  resetFilter,
  loadMoreItem,
  resetLoading,
  loadingProcess,
  loadingSuccess,
  loadingFail,
  turnOnRefreshing,
  replaceItem,
}

export function listReducer<
  T extends Model & { id?: number },
  TFilter extends ModelFilter,
  P extends keyof TFilter
>(state: ListData<any, any>, action: ListAction<T, TFilter, P>) {
  switch (action.type) {
    case Action.refreshList:
      return {
        ...state,
        list: {},
        filter: {
          ...state.filter,
          skip: 0,
          take: action.take ?? DEFAULT_TAKE,
        },
      };

    case Action.resetFilter:
      return {
        ...state,
        filter: action.newFilter,
        list: {},
        total: 0,
        loading: LoadingStatus.PROGRESSING,
      };

    case Action.resetList:
      return {
        ...state,
        list: {},
      };

    case Action.replaceItem:
      state.list = Object.fromEntries(
        Object.entries(state.list).map(([startSkip, list]) => {
          return [
            startSkip,
            list.map((item) => {
              if (action.item !== undefined && item.id === action.item.id) {
                return action.item;
              }
              return item;
            }),
          ];
        })
      );
      return { ...state };

    case Action.searchList:
      const isStringField: boolean = typeof action.searchType === 'undefined';
      const isEmptyString: boolean = action.searchValue === '';
      return {
        ...state,
        list: {},
        filter: {
          ...state.filter,
          [action.searchField!]: !isEmptyString
            ? isStringField
              ? action.searchValue
              : {
                  [action.searchType!]: action.searchValue,
                }
            : isStringField
            ? null
            : {},
          skip: 0,
          take: action.take ?? DEFAULT_TAKE,
        },
        nextAction: Action.setList,
      };

    case Action.loadMoreItem:
      return {
        ...state,
        filter: {
          ...state.filter,
          skip: state.filter.skip + (action.take ?? DEFAULT_TAKE),
          take: action.take ?? DEFAULT_TAKE,
        },
      };

    case Action.setList:
      return {
        ...state,
        list: {
          ...state.list,
          [state.filter.skip]: action.list,
        },
        total: action.total,
      };

    case Action.resetLoading:
      return {
        ...state,
        loading: LoadingStatus.INIT,
        refreshing: false,
      };

    case Action.loadingProcess:
      return {
        ...state,
        loading: LoadingStatus.PROGRESSING,
        refreshing: false,
      };

    case Action.loadingSuccess:
      return {
        ...state,
        loading: LoadingStatus.SUCCESS,
        refreshing: false,
      };

    case Action.loadingFail:
      return {
        ...state,
        loading: LoadingStatus.FAIL,
        refreshing: false,
      };

    case Action.turnOnRefreshing:
      return {
        ...state,
        //loading: LoadingStatus.INIT,
        refreshing: true,
      };

    default:
      return state;
  }
}

export function useList<
  T extends Model & { id?: number },
  TFilter extends ModelFilter,
  P extends keyof TFilter = any
>(
  FilterClass: new () => TFilter,
  getList: (filter: TFilter) => Observable<T[]>,
  getCount: (filter: TFilter) => Observable<number>,
  searchField: P,
  searchType?: keyof TFilter[P] | string,
  defaultFilter?: TFilter,
  take?: number
): [
  // List Data
  T[],
  number,
  LoadingStatus,
  boolean,
  TFilter,
  // Dispatch function
  () => void,
  () => void,
  (searchValue: string) => void,
  Dispatch<ListAction<T, TFilter, P>>
] {
  const [
    {
      // Loaded items
      list,
      // Loading state
      loading,
      // Refreshing state
      refreshing,
      // Filter object
      filter,
      // Total filtered items
      total,
    },
    dispatch,
  ] = React.useReducer<
    Reducer<ListData<T, TFilter>, ListAction<T, TFilter, P>>
  >(listReducer, {
    list: {},
    filter: {
      ...(defaultFilter ?? new FilterClass()),
      skip: 0,
      take: take ?? DEFAULT_TAKE,
    },
    loading: LoadingStatus.INIT,
    refreshing: false,
    total: 0,
  });

  const arrayList: T[] = React.useMemo(() => {
    return Object.values(list).flat();
  }, [list]);

  // const [isFirstLoading, setIsFirstLoading] = React.useState<boolean>(false);

  const handleLoadList = React.useCallback((): Observable<[T[], number]> => {
    dispatch({
      type: Action.loadingProcess,
    });
    return (
      forkJoin([getList(filter), getCount(filter)])
        // Pipe loading
        .pipe()
    );
  }, [filter, getCount, getList]);

  React.useEffect(() => {
    const subscription: Subscription = handleLoadList().subscribe({
      next: ([list, total]: [T[], number]) => {
        dispatch({
          type: Action.loadingSuccess,
        });
        dispatch({
          type: Action.setList,
          list,
          total,
        });
      },
      error: () => {
        dispatch({
          type: Action.loadingFail,
        });
        console.log('Server error!');
      },
    });
    dispatch({
      type: Action.resetLoading,
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [getCount, getList, handleLoadList]);

  const handleRefresh = React.useCallback(() => {
    dispatch({
      type: Action.turnOnRefreshing,
    });
    dispatch({
      type: Action.refreshList,
      take: take,
    });
  }, [take]);

  const handleLoadMore = React.useCallback(() => {
    if (
      arrayList.length < total! &&
      arrayList.length >= (take ?? DEFAULT_TAKE) &&
      total! > 0 &&
      loading !== LoadingStatus.PROGRESSING
    ) {
      dispatch({
        type: Action.loadingProcess,
      });
      dispatch({
        type: Action.loadMoreItem,
        take: take,
      });
    }
  }, [arrayList.length, loading, take, total]);

  const handleSearch = React.useCallback(
    (searchValue: string) => {
      dispatch({
        type: Action.loadingProcess,
      });
      dispatch({
        type: Action.searchList,
        searchValue,
        searchType,
        searchField,
        take,
      });
    },
    [searchField, searchType, take]
  );

  return [
    arrayList,
    total!,
    loading,
    refreshing,
    filter,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    dispatch,
  ];
}
