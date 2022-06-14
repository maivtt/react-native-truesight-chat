import atomicStyles from 'react-native-atomic-styles/src/styles.scss';
import type {
  Conversation,
  ConversationFilter,
  ConversationMessage,
  ConversationMessageFilter,
} from 'src/models';
import type { Observable } from 'rxjs';

export * from './models';

export * from './components';

export * from './types';

interface TruesightChatOptions {
  listConversation: typeof TruesightChat['listConversation'];

  countConversation: typeof TruesightChat['countConversation'];

  listConversationMessage: typeof TruesightChat['listConversationMessage'];

  countConversationMessage: typeof TruesightChat['countConversationMessage'];

  atomicStyles?: typeof TruesightChat['atomicStyles'];
}

class TruesightChat {
  public static listConversation: (
    conversationFilter: ConversationFilter
  ) => Observable<Conversation[]>;

  public static countConversation: (
    conversationFilter: ConversationFilter
  ) => Observable<number>;

  public static listConversationMessage: (
    conversationMessageFilter: ConversationMessageFilter
  ) => Observable<ConversationMessage[]>;

  public static countConversationMessage: (
    conversationMessageFilter: ConversationMessageFilter
  ) => Observable<number>;

  public static atomicStyles: typeof atomicStyles = atomicStyles;

  public static config(options: TruesightChatOptions) {
    if (options.listConversation) {
      this.listConversation = options.listConversation;
    } else {
      console.error('Missing list conversation');
    }
    if (options.countConversation) {
      this.countConversation = options.countConversation;
    } else {
      console.error('Missing count conversation');
    }
    if (options.listConversationMessage) {
      this.listConversationMessage = options.listConversationMessage;
    } else {
      console.error('Missing list conversation message');
    }
    if (options.countConversationMessage) {
      this.countConversationMessage = options.countConversationMessage;
    } else {
      console.error('Missing count conversation message');
    }
    if (options.atomicStyles) {
      this.atomicStyles = options.atomicStyles;
    }
  }
}

export default TruesightChat;
