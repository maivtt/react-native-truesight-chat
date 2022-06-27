import type { Reducer } from 'react';
import type { GlobalUser } from 'react-native-truesight-chat';

export type ListGlobalUserReducer = Reducer<
  ListGlobalUserReducerState,
  ListGlobalUserReducerAction
>;

export interface ListGlobalUserReducerState {
  list?: GlobalUser[];

  loading?: boolean;

  search?: string;

  error?: string | undefined;
}

export interface ListGlobalUserReducerAction {
  type: ListGlobalUserReducerActionType;

  error?: string;

  search?: string;

  list?: GlobalUser[];
}

export enum ListGlobalUserReducerActionType {
  TurnOnLoading,
  TurnOffLoading,
  ClearError,
  SetError,
  Searching,
  SetList,
}

export function listGlobalUserReducer(
  state: ListGlobalUserReducerState,
  action: ListGlobalUserReducerAction
): ListGlobalUserReducerState {
  switch (action.type) {
    case ListGlobalUserReducerActionType.Searching:
      return {
        ...state,
        search: action.search,
      };

    case ListGlobalUserReducerActionType.SetList:
      return {
        ...state,
        list: action.list,
      };

    case ListGlobalUserReducerActionType.TurnOnLoading:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ListGlobalUserReducerActionType.TurnOffLoading:
      return {
        ...state,
        loading: false,
      };

    case ListGlobalUserReducerActionType.SetError:
      return {
        ...state,
        error: action.error,
      };

    case ListGlobalUserReducerActionType.ClearError:
      return {
        ...state,
        error: undefined,
      };

    default:
      return state;
  }
}
