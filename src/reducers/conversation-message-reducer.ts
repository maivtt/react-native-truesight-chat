import type { Reducer } from 'react';
import type { ConversationMessage } from 'react-native-truesight-chat';

export type ConversationMessageReducer = Reducer<
  ConversationMessageReducerState,
  ConversationMessageReducerAction
>;

export interface ConversationMessageReducerState {
  content?: string;

  loading?: boolean;

  error?: string | undefined;

  reMessage?: ConversationMessage | null;
}

export interface ConversationMessageReducerAction {
  type: ConversationMessageReducerActionType;

  error?: string;

  content?: string;

  reMessage?: ConversationMessage;
}

export enum ConversationMessageReducerActionType {
  SetContent,
  ClearContent,
  SetReMessage,
  ClearReMessage,
  TurnOnLoading,
  TurnOffLoading,
  ClearError,
  SetError,
}

export function conversationMessageReducer(
  state: ConversationMessageReducerState,
  action: ConversationMessageReducerAction
): ConversationMessageReducerState {
  switch (action.type) {
    case ConversationMessageReducerActionType.SetContent:
      return {
        ...state,
        content: action.content,
      };

    case ConversationMessageReducerActionType.ClearContent:
      return {
        ...state,
        content: '',
      };

    case ConversationMessageReducerActionType.SetReMessage:
      return {
        ...state,
        reMessage: action.reMessage,
      };

    case ConversationMessageReducerActionType.ClearReMessage:
      return {
        ...state,
        reMessage: null,
      };

    case ConversationMessageReducerActionType.TurnOnLoading:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ConversationMessageReducerActionType.TurnOffLoading:
      return {
        ...state,
        loading: false,
        reMessage: null,
      };

    case ConversationMessageReducerActionType.SetError:
      return {
        ...state,
        error: action.error,
      };

    case ConversationMessageReducerActionType.ClearError:
      return {
        ...state,
        error: undefined,
      };

    default:
      return state;
  }
}
