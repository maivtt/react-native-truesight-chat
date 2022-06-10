import type {
  Conversation,
  ConversationParticipant,
} from 'react-native-truesight-chat';

export function getConversationName(
  conversation: Conversation
): string | undefined {
  if (conversation) {
    if (conversation?.name) {
      return conversation.name;
    }
    if (
      conversation?.conversationParticipants &&
      conversation?.conversationParticipants.length > 0
    ) {
      if (conversation?.conversationParticipants?.length === 1) {
        const user = conversation.conversationParticipants[0];
        return user?.globalUser?.displayName;
      }
      if (conversation?.conversationParticipants?.length === 2) {
        const [other] = conversation.conversationParticipants?.filter(
          (e) => e.globalUserId !== 123
        );
        if (other) {
          return other?.globalUser?.displayName;
        }
      }
      let name = '';
      conversation?.conversationParticipants.forEach(
        (item: ConversationParticipant, index: number) => {
          if (index === 0) {
            name =
              name + (index > 0 ? ', ' : '') + item?.globalUser?.displayName;
          }
        }
      );
      return name;
    }
  }
  return '';
}

export function getParticipantConversationName(
  conversation: Conversation
): string | undefined {
  let name = '';
  if (conversation) {
    if (
      conversation?.conversationParticipants &&
      conversation?.conversationParticipants.length > 0
    ) {
      conversation?.conversationParticipants.forEach(
        (item: ConversationParticipant, index: number) => {
          name = name + (index > 0 ? ', ' : '') + item?.globalUser?.displayName;
        }
      );
      return name;
    }
  }
  return '';
}
