import type { Reducer } from 'react';
import type {
  Conversation,
  ConversationParticipant,
} from 'react-native-truesight-chat';

export type ConversationMemberReducer = Reducer<
  ConversationMemberReducerState,
  ConversationMemberReducerAction
>;

export interface ConversationMemberReducerState {
  conversation?: Conversation;

  conversationParticipants?: ConversationParticipant[];

  loading?: boolean;

  error?: string | undefined;

  visible?: boolean;

  conversationName?: string;
}

export interface ConversationMemberReducerAction {
  type: ConversationMemberReducerActionType;

  error?: string;

  user?: ConversationParticipant;

  listGlobalUser?: ConversationParticipant[];

  conversation?: Conversation;

  name?: string;
}

export enum ConversationMemberReducerActionType {
  TurnOnLoading,
  TurnOffLoading,
  ClearError,
  SetError,
  SetConversation,
  SetConversationParticipants,
  AddConversationParticipant,
  OpenModal,
  CloseModal,
  SetName,
}

export function conversationMemberReducer(
  state: ConversationMemberReducerState,
  action: ConversationMemberReducerAction
): ConversationMemberReducerState {
  const { conversationParticipants } = state;
  switch (action.type) {
    case ConversationMemberReducerActionType.TurnOnLoading:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ConversationMemberReducerActionType.TurnOffLoading:
      return {
        ...state,
        loading: false,
      };

    case ConversationMemberReducerActionType.SetError:
      return {
        ...state,
        error: action.error,
      };

    case ConversationMemberReducerActionType.ClearError:
      return {
        ...state,
        error: undefined,
      };

    case ConversationMemberReducerActionType.OpenModal:
      return {
        ...state,
        visible: true,
        error: undefined,
      };

    case ConversationMemberReducerActionType.CloseModal:
      return {
        ...state,
        visible: false,
        error: undefined,
      };

    case ConversationMemberReducerActionType.SetName:
      return {
        ...state,
        conversationName: action.name,
      };

    case ConversationMemberReducerActionType.SetConversation:
      return {
        ...state,
        conversation: action.conversation,
      };

    case ConversationMemberReducerActionType.SetConversationParticipants:
      return {
        ...state,
        conversationParticipants: action.listGlobalUser,
      };

    case ConversationMemberReducerActionType.AddConversationParticipant:
      if (action.user) {
        conversationParticipants?.push(action.user);
      }
      return {
        ...state,
        conversationParticipants: [...new Set(conversationParticipants)],
      };

    default:
      return state;
  }
}
