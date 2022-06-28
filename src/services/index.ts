import { useCamera } from './use-camera';
import { useListConversation } from './use-list-conversation';
import { useChat } from './use-chat';
import { useDownloadFile } from './use-download-file';
import { useImage } from './use-image';
import { useListGlobalUser } from './use-list-global-user';
import { useAttachment } from './use-attachment';
import { useCreateConversation } from './use-create-conversation';
import { useCreateGroupConversation } from './use-create-group-conversation';

export class ConversationService {
  public readonly useListConversation = useListConversation;

  public readonly useChat = useChat;

  public readonly useCamera = useCamera;

  public readonly useImage = useImage;

  public readonly useAttachment = useAttachment;

  public readonly useDownloadFile = useDownloadFile;

  public readonly useListGlobalUser = useListGlobalUser;

  public readonly useCreateConversation = useCreateConversation;

  public readonly useCreateGroupConversation = useCreateGroupConversation;
}

export const conversationService: ConversationService =
  new ConversationService();
