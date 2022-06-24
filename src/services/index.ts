import { useCamera } from './use-camera';
import { useListConversation } from './use-list-conversation';
import { useListMessage } from './use-list-message';
import { useDownloadFile } from './use-download-file';

export class ConversationService {
  public readonly useListConversation = useListConversation;

  public readonly useListMessage = useListMessage;

  public readonly useCamera = useCamera;

  public readonly useDownloadFile = useDownloadFile;
}

export const conversationService: ConversationService =
  new ConversationService();
