import type { ConversationMessage } from 'src/models/ConversationMessage';

export interface GlobalState {
  conversation: {
    message?: ConversationMessage;

    conversations?: ConversationMessage[];
  };
}
