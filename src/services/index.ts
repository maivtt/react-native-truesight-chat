import { useCamera } from './use-camera';
import { useListConversation } from './use-list-conversation';
import { useListMessage } from './use-list-message';

export class ConversationService {
  public readonly useListConversation = useListConversation;

  public readonly useListMessage = useListMessage;

  public readonly useCamera = useCamera;
}

export const conversationService: ConversationService =
  new ConversationService();
