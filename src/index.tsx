import type { Conversation, ConversationFilter } from './models/Conversation';
import type { Observable } from 'rxjs';

interface TruesightChatOptions {
  listConversation: (
    conversationFilter: ConversationFilter
  ) => Observable<Conversation[]>;
}

class TruesightChat {
  public static listConversation: (
    conversationFilter: ConversationFilter
  ) => Observable<Conversation[]>;

  public static config(options: TruesightChatOptions) {
    if (options.listConversation) {
      this.listConversation = options.listConversation;
    } else {
      console.log('Missing listConversation');
    }
  }
}

export default TruesightChat;
