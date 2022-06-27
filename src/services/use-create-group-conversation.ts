import React from 'react';
import TruesightChat, {
  Conversation,
  ConversationParticipant,
  GlobalUser,
} from 'react-native-truesight-chat';
import {
  ConversationReducer,
  conversationReducer,
  ConversationReducerActionType,
} from '../reducers/conversation-reducer';
import { finalize, Subscription } from 'rxjs';
import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

export function useCreateGroupConversation(
  currentGlobalUser: GlobalUser
): [
  GlobalUser[],
  (use: GlobalUser) => void,
  boolean,
  string | undefined,
  (value: string) => void,
  boolean,
  () => void,
  () => void,
  () => void
] {
  const [translate] = useTranslation();

  const [
    { conversationParticipants, conversationName, loading, error, visible },
    dispatch,
  ] = React.useReducer<ConversationReducer>(conversationReducer, {
    conversationParticipants: currentGlobalUser ? [currentGlobalUser] : [],
    loading: false,
    visible: false,
    conversationName: '',
  });

  const handleSelectParticipant = React.useCallback((user: GlobalUser) => {
    dispatch({
      type: ConversationReducerActionType.SelectParticipant,
      conversationParticipant: user,
    });
  }, []);

  const handleSetConversationName = React.useCallback((value: string) => {
    dispatch({
      type: ConversationReducerActionType.SetConversationName,
      name: value,
    });
  }, []);

  const handleOpen = React.useCallback(() => {
    dispatch({ type: ConversationReducerActionType.OpenModal });
  }, []);

  const handleClose = React.useCallback(() => {
    dispatch({ type: ConversationReducerActionType.CloseModal });
  }, []);

  const handleCreateGroupConversation = React.useCallback(() => {
    dispatch({ type: ConversationReducerActionType.ClearError });
    if (conversationName!.length === 0) {
      dispatch({
        type: ConversationReducerActionType.SetError,
        error: translate('Lang.Messenger.ConversationGroup.NameRequired'),
      });
      return;
    }
    dispatch({ type: ConversationReducerActionType.TurnOnLoading });
    const participants: ConversationParticipant[] =
      conversationParticipants!?.map((e: GlobalUser) => {
        return Object.assign<
          ConversationParticipant,
          Partial<ConversationParticipant>
        >(new ConversationParticipant(), { globalUserId: e.id, globalUser: e });
      });
    const subscription: Subscription = TruesightChat.create({
      name: conversationName,
      conversationParticipants: participants,
    })
      .pipe(
        finalize(() => {
          dispatch({ type: ConversationReducerActionType.TurnOffLoading });
        })
      )
      .subscribe({
        next: () => {
          //TODO:
          dispatch({ type: ConversationReducerActionType.CloseModal });
        },
        error: (error: AxiosError<Conversation>) => {
          if (error.response?.status === 400 && error.response?.data) {
            const e = error.response.data.errors;
            if (e) {
              dispatch({
                type: ConversationReducerActionType.SetError,
                error: Object.values(e!)[0] as string,
              });
            }
          }
        },
      });
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [conversationName, conversationParticipants, translate]);

  return [
    conversationParticipants!,
    handleSelectParticipant,
    loading!,
    error,
    handleSetConversationName,
    visible!,
    handleOpen,
    handleClose,
    handleCreateGroupConversation,
  ];
}
