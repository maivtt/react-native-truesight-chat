import atomicStyles from 'react-native-atomic-styles/src/styles.scss';
import type { Conversation, ConversationFilter } from 'src/models';
import type { Observable } from 'rxjs';

export * from './models';

export * from './components';

export * from './types';

interface TruesightChatOptions {
  listConversation: typeof TruesightChat['listConversation'];

  atomicStyles?: typeof TruesightChat['atomicStyles'];
}

class TruesightChat {
  public static listConversation: (
    conversationFilter: ConversationFilter
  ) => Observable<Conversation[]>;

  public static atomicStyles: typeof atomicStyles = atomicStyles;

  public static config(options: TruesightChatOptions) {
    if (options.listConversation) {
      this.listConversation = options.listConversation;
    } else {
      console.error('Missing list conversation');
    }
    if (options.atomicStyles) {
      this.atomicStyles = options.atomicStyles;
    }
  }
}

export default TruesightChat;
