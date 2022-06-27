import React from 'react';
import { finalize, Subscription } from 'rxjs';
import type { AxiosError } from 'axios';
import type { GlobalUser } from 'react-native-truesight-chat';
import TruesightChat, {
  Conversation,
  ConversationParticipant,
} from 'react-native-truesight-chat';
import {
  ConversationReducer,
  conversationReducer,
  ConversationReducerActionType,
} from '../reducers/conversation-reducer';

export function useCreateConversation(
  currentGlobalUser: GlobalUser
): [
  GlobalUser,
  boolean,
  string | undefined,
  boolean,
  () => void,
  (user: GlobalUser) => void,
  () => void
] {
  const [{ conversationParticipants, loading, error, visible }, dispatch] =
    React.useReducer<ConversationReducer>(conversationReducer, {
      conversationParticipants: currentGlobalUser ? [currentGlobalUser] : [],
      loading: false,
      visible: false,
      conversationName: '',
    });

  const handleAddParticipant = React.useCallback((user: GlobalUser) => {
    dispatch({
      type: ConversationReducerActionType.AddParticipant,
      conversationParticipant: user,
    });
  }, []);

  const handleCancelAddParticipant = React.useCallback(() => {
    dispatch({
      type: ConversationReducerActionType.SetParticipant,
      conversationParticipant: currentGlobalUser ?? undefined,
    });
  }, [currentGlobalUser]);

  const handleCreateGroupConversation = React.useCallback(() => {
    dispatch({ type: ConversationReducerActionType.TurnOnLoading });
    const participants: ConversationParticipant[] =
      conversationParticipants!?.map((e: GlobalUser) => {
        return Object.assign<
          ConversationParticipant,
          Partial<ConversationParticipant>
        >(new ConversationParticipant(), { globalUserId: e.id, globalUser: e });
      });
    const otherUser: GlobalUser | undefined =
      conversationParticipants &&
      conversationParticipants.find((e) => e.id !== currentGlobalUser?.id);
    const subscription: Subscription = TruesightChat.create({
      name: '',
      avatar: otherUser?.avatar,
      conversationParticipants: participants,
    })
      .pipe(
        finalize(() => {
          dispatch({ type: ConversationReducerActionType.TurnOffLoading });
        })
      )
      .subscribe({
        next: () => {
          // TODO:
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
  }, [conversationParticipants, currentGlobalUser]);

  return [
    conversationParticipants?.find(
      (e: GlobalUser) => e.id !== currentGlobalUser?.id
    )!,
    loading!,
    error,
    visible!,
    handleCreateGroupConversation,
    handleAddParticipant,
    handleCancelAddParticipant,
  ];
}
