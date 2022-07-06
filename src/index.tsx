import atomicStyles from 'react-native-atomic-styles/src/styles.scss';
import type {
  Conversation,
  ConversationAttachment,
  ConversationAttachmentFilter,
  ConversationFile,
  ConversationFilter,
  ConversationMessage,
  ConversationMessageFilter,
  GlobalUser,
  GlobalUserFilter,
} from 'src/models';
import type { Observable } from 'rxjs';
import type { DocumentPickerResponse } from 'react-native-document-picker';
import type { ImagePickerResponse } from 'src/types';

export * from './models';

export * from './components';

export * from './types';

export * from './services';

interface TruesightChatOptions {
  atomicStyles?: typeof TruesightChat['atomicStyles'];

  serverUrl?: typeof TruesightChat['serverUrl'];

  listConversation: typeof TruesightChat['listConversation'];

  countConversation: typeof TruesightChat['countConversation'];

  listConversationMessage: typeof TruesightChat['listConversationMessage'];

  countConversationMessage: typeof TruesightChat['countConversationMessage'];

  listConversationAttachment: typeof TruesightChat['listConversationAttachment'];

  countConversationAttachment: typeof TruesightChat['countConversationAttachment'];

  singleListGlobalUser: typeof TruesightChat['singleListGlobalUser'];

  get: typeof TruesightChat['get'];

  create: typeof TruesightChat['create'];

  update?: typeof TruesightChat['update'];

  multiUploadFile: typeof TruesightChat['multiUploadFile'];
}

class TruesightChat {
  public static atomicStyles: typeof atomicStyles = atomicStyles;

  public static serverUrl: string;

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

  public static listConversationAttachment: (
    conversationAttachmentFilter: ConversationAttachmentFilter
  ) => Observable<ConversationAttachment[]>;

  public static countConversationAttachment: (
    conversationAttachmentFilter: ConversationAttachmentFilter
  ) => Observable<number>;

  public static singleListGlobalUser: (
    globalUserFilter: GlobalUserFilter
  ) => Observable<GlobalUser[]>;

  public static get: (id: number) => Observable<Conversation>;

  public static create: (
    conversationMessage: ConversationMessage
  ) => Observable<ConversationMessage>;

  public static update: (
    conversation: Conversation
  ) => Observable<Conversation>;

  public static multiUploadFile: (
    images: ImagePickerResponse[] | DocumentPickerResponse[]
  ) => Observable<ConversationFile[]>;

  public static config(options: TruesightChatOptions) {
    if (options.atomicStyles) {
      this.atomicStyles = options.atomicStyles;
    }
    if (options.serverUrl) {
      this.serverUrl = options.serverUrl;
    }
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
    if (options.listConversationAttachment) {
      this.listConversationAttachment = options.listConversationAttachment;
    } else {
      console.error('Missing list conversation attachment');
    }
    if (options.countConversationAttachment) {
      this.countConversationAttachment = options.countConversationAttachment;
    } else {
      console.error('Missing count conversation attachment');
    }
    if (options.singleListGlobalUser) {
      this.singleListGlobalUser = options.singleListGlobalUser;
    } else {
      console.error('Missing single list global u∂ser');
    }
    if (options.get) {
      this.get = options.get;
    } else {
      console.error('Missing get conversation');
    }
    if (options.create) {
      this.create = options.create;
    } else {
      console.error('Missing create conversation');
    }
    if (options.multiUploadFile) {
      this.multiUploadFile = options.multiUploadFile;
    } else {
      console.error('Missing multiple upload file');
    }
  }
}

export default TruesightChat;
