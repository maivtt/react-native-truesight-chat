import { useCamera } from './use-camera';
import { useListConversation } from './use-list-conversation';

export class ConversationService {
  public readonly useListConversation = useListConversation;

  public readonly useCamera = useCamera;
}

export const conversationService: ConversationService =
  new ConversationService();
