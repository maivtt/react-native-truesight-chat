import React from 'react';
import { useSubscription } from 'react3l';
import { finalize } from 'rxjs';
import type { AxiosError } from 'axios';
import TruesightChat, { Conversation } from 'react-native-truesight-chat';
import type { ConversationMemberReducer } from '../reducers/conversation-member-reducer';
import {
  conversationMemberReducer,
  ConversationMemberReducerActionType,
} from '../reducers/conversation-member-reducer';

export function useMember(
  currentConversation: Conversation,
  navigation: any
): [
  Conversation,
  any,
  any,
  any,
  number,
  (_tab: number) => () => void,
  (user: any) => void
] {
  const subscription = useSubscription();
  const [conversation, setConversation] =
    React.useState<Conversation>(currentConversation);
  const [tab, setTab] = React.useState<number>(0);

  const [{ conversationParticipants, loading, error }, dispatch] =
    React.useReducer<ConversationMemberReducer>(conversationMemberReducer, {
      conversationParticipants: [],
      loading: false,
      visible: false,
    });

  const handleChangeTab = React.useCallback(
    (_tab: number) => () => {
      setTab(_tab);
    },
    []
  );

  const handleRefresh = React.useCallback(() => {
    if (!loading && currentConversation?.id && currentConversation.id >= 0) {
      dispatch({ type: ConversationMemberReducerActionType.TurnOnLoading });
      TruesightChat.get(currentConversation.id)
        .pipe(
          finalize(() => {
            dispatch({
              type: ConversationMemberReducerActionType.TurnOffLoading,
            });
          })
        )
        .subscribe({
          next: (value: Conversation) => {
            setConversation(value);
            dispatch({
              type: ConversationMemberReducerActionType.SetConversationParticipants,
              listGlobalUser: value?.conversationParticipants,
            });
          },
          error: (axiosError: AxiosError) => {
            if (
              axiosError.response?.status === 400 &&
              axiosError.response?.data
            ) {
              // @ts-ignore
              const e = axiosError.response.data.errors;
              if (e) {
                dispatch({
                  type: ConversationMemberReducerActionType.SetError,
                  error: Object.values(e!)[0] as string,
                });
              }
            }
          },
        });
    }
  }, [currentConversation, loading]);

  const handleRemove = React.useCallback(
    (user: any) => {
      dispatch({ type: ConversationMemberReducerActionType.TurnOnLoading });
      subscription.add(
        TruesightChat.update({
          ...conversation,
          conversationParticipants:
            conversation.conversationParticipants?.filter(
              (e) => e.globalUserId !== user?.id
            ),
        })
          .pipe(
            finalize(() => {
              dispatch({
                type: ConversationMemberReducerActionType.TurnOffLoading,
              });
            })
          )
          .subscribe({
            next: () => {
              dispatch({
                type: ConversationMemberReducerActionType.CloseModal,
              });
              handleRefresh();
            },
            error: (axiosError: AxiosError) => {
              if (
                axiosError.response?.status === 400 &&
                axiosError.response?.data
              ) {
                // @ts-ignore
                const e = axiosError.response.data.errors;
                if (e) {
                  dispatch({
                    type: ConversationMemberReducerActionType.SetError,
                    error: Object.values(e!)[0] as string,
                  });
                }
              }
            },
          })
      );
    },
    [conversation, handleRefresh, subscription]
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleRefresh();
    });
    return function cleanup() {
      unsubscribe();
    };
  }, [handleRefresh, navigation]);

  return [
    conversation,
    conversationParticipants!,
    loading!,
    error,
    tab,
    handleChangeTab,
    handleRemove,
  ];
}
