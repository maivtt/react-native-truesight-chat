import type { ConversationMessage } from 'react-native-truesight-chat';

export interface GlobalState {
  conversation: {
    message?: ConversationMessage;

    conversations?: ConversationMessage[];
  };
}

export const newMessageSelector = (state: GlobalState) =>
  state.conversation.message;

export const conversationsSelector = (state: GlobalState) =>
  state.conversation.conversations;
