import type { Reducer } from 'react';
import type { GlobalUser } from 'react-native-truesight-chat';

export type ConversationReducer = Reducer<
  ConversationReducerState,
  ConversationReducerAction
>;

export interface ConversationReducerState {
  conversationParticipants?: GlobalUser[];

  conversationName?: string;

  loading?: boolean;

  error?: string | undefined;

  visible?: boolean;
}

export interface ConversationReducerAction {
  type: ConversationReducerActionType;

  error?: string;

  conversationParticipant?: GlobalUser;

  name?: string;
}

export enum ConversationReducerActionType {
  TurnOnLoading,
  TurnOffLoading,
  ClearError,
  SetError,
  SetParticipant,
  AddParticipant, //single conversation
  RemoveParticipant,
  SelectParticipant, //multiple conversation
  SetConversationName,
  OpenModal,
  CloseModal,
}

export function conversationReducer(
  state: ConversationReducerState,
  action: ConversationReducerAction
): ConversationReducerState {
  switch (action.type) {
    case ConversationReducerActionType.TurnOnLoading:
      return {
        ...state,
        loading: true,
        error: undefined,
      };

    case ConversationReducerActionType.TurnOffLoading:
      return {
        ...state,
        loading: false,
      };

    case ConversationReducerActionType.SetError:
      return {
        ...state,
        error: action.error,
      };

    case ConversationReducerActionType.ClearError:
      return {
        ...state,
        error: undefined,
      };

    case ConversationReducerActionType.OpenModal:
      return {
        ...state,
        visible: true,
        error: undefined,
      };

    case ConversationReducerActionType.CloseModal:
      return {
        ...state,
        visible: false,
        error: undefined,
      };

    case ConversationReducerActionType.SetParticipant:
      return {
        ...state,
        error: undefined,
        visible: false,
        conversationParticipants: action.conversationParticipant
          ? [action.conversationParticipant]
          : [],
      };

    case ConversationReducerActionType.AddParticipant:
      return {
        ...state,
        error: undefined,
        conversationParticipants: [
          ...state.conversationParticipants!,
          action.conversationParticipant!,
        ],
        visible: true,
      };

    case ConversationReducerActionType.RemoveParticipant:
      if (state.conversationParticipants) {
        const index: number = state.conversationParticipants.findIndex(
          (globalUser: GlobalUser) =>
            globalUser.id === action.conversationParticipant!.id
        );
        state.conversationParticipants.splice(index, 1);
      }
      return {
        ...state,
        error: undefined,
      };

    case ConversationReducerActionType.SelectParticipant:
      const { conversationParticipants } = state;
      if (conversationParticipants) {
        const index: number = conversationParticipants.findIndex(
          (globalUser: GlobalUser) =>
            globalUser.id === action.conversationParticipant!.id
        );
        if (index >= 0) {
          conversationParticipants.splice(index, 1);
        } else {
          conversationParticipants.push(action.conversationParticipant!);
        }
      }
      return {
        ...state,
        conversationParticipants: conversationParticipants,
        error: undefined,
      };

    case ConversationReducerActionType.SetConversationName:
      return {
        ...state,
        conversationName: action.name,
        error: undefined,
      };

    default:
      return state;
  }
}
