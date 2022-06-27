import React from 'react';
import { Keyboard } from 'react-native';
import { StringFilter } from 'react3l-advanced-filters';
import { finalize, Subscription } from 'rxjs';
import type { AxiosError } from 'axios';
import TruesightChat, {
  GlobalUser,
  GlobalUserFilter,
} from 'react-native-truesight-chat';
import useDebounce from '../hooks/use-debounce';
import {
  ListGlobalUserReducer,
  listGlobalUserReducer,
  ListGlobalUserReducerActionType,
} from '../reducers/list-global-user-reducer';

export function useListGlobalUser(
  currentGlobalUser: GlobalUser
): [
  GlobalUser[],
  boolean,
  string,
  string | undefined,
  (text: string) => void,
  () => void
] {
  const [{ list, search, loading, error }, dispatch] =
    React.useReducer<ListGlobalUserReducer>(listGlobalUserReducer, {
      list: [],
      loading: false,
      search: '',
    });

  const debouncedSearch = useDebounce(search, 100);

  const handleGetListGlobalUser = React.useCallback(
    (text?: string) => {
      dispatch({ type: ListGlobalUserReducerActionType.TurnOnLoading });
      const subscription: Subscription = TruesightChat.singleListGlobalUser({
        ...new GlobalUserFilter(),
        id: {
          notEqual: currentGlobalUser?.id,
        },
        displayName: { ...new StringFilter(), contain: text },
      })
        .pipe(
          finalize(() => {
            dispatch({ type: ListGlobalUserReducerActionType.TurnOffLoading });
          })
        )
        .subscribe({
          next: (result: GlobalUser[]) => {
            dispatch({
              type: ListGlobalUserReducerActionType.SetList,
              list: result,
            });
          },
          error: (error: AxiosError<any>) => {
            if (error.response?.status === 400 && error.response?.data) {
              const e = error.response.data.errors;
              if (e) {
                dispatch({
                  type: ListGlobalUserReducerActionType.SetError,
                  error: Object.values(e!)[0] as string,
                });
              }
            }
          },
        });

      return function cleanup() {
        subscription.unsubscribe();
      };
    },
    [currentGlobalUser]
  );

  const handleSearch = React.useCallback((text: string) => {
    dispatch({
      type: ListGlobalUserReducerActionType.Searching,
      search: text,
    });
  }, []);

  const handleRefresh = React.useCallback(() => {
    Keyboard.dismiss();
    handleGetListGlobalUser(debouncedSearch);
  }, [debouncedSearch, handleGetListGlobalUser]);

  React.useEffect(() => {
    if (debouncedSearch) {
      dispatch({ type: ListGlobalUserReducerActionType.TurnOnLoading });
      handleGetListGlobalUser(debouncedSearch);
    } else {
      handleGetListGlobalUser('');
    }
  }, [debouncedSearch, handleGetListGlobalUser]);

  return [list!, loading!, search!, error, handleSearch, handleRefresh];
}
