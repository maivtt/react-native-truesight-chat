import { Conversation } from './Conversation';
import { ConversationConfiguration } from './ConversationConfiguration';
import { ConversationParticipant } from './ConversationParticipant';
import { ConversationReadHistory } from './ConversationReadHistory';
import { ConversationType } from './ConversationType';
import nameof from 'ts-nameof.macro';
import { Status } from './Status';
import { ObjectField } from 'react3l-decorators';
import { GlobalUser } from './GlobalUser';

ObjectField(ConversationConfiguration)(
  Conversation.prototype,
  nameof(Conversation.prototype.conversationConfiguration)
);

ObjectField(ConversationType)(
  Conversation.prototype,
  nameof(Conversation.prototype.conversationType)
);

ObjectField(GlobalUser)(
  Conversation.prototype,
  nameof(Conversation.prototype.latestGlobalUser)
);

ObjectField(ConversationType)(
  ConversationConfiguration.prototype,
  nameof(ConversationConfiguration.prototype.conversationType)
);

ObjectField(Status)(
  ConversationConfiguration.prototype,
  nameof(ConversationConfiguration.prototype.status)
);

ObjectField(Conversation)(
  ConversationParticipant.prototype,
  nameof(ConversationParticipant.prototype.conversation)
);

ObjectField(GlobalUser)(
  ConversationParticipant.prototype,
  nameof(ConversationParticipant.prototype.globalUser)
);

ObjectField(Conversation)(
  ConversationReadHistory.prototype,
  nameof(ConversationReadHistory.prototype.conversation)
);

ObjectField(GlobalUser)(
  ConversationReadHistory.prototype,
  nameof(ConversationReadHistory.prototype.globalUser)
);

export * from './Conversation';

export * from './ConversationMessage';

export * from './ConversationAttachment';

export * from './ConversationFile';

export * from './ConversationAttachmentType';

export * from './ConversationConfiguration';

export * from './ConversationParticipant';

export * from './ConversationReadHistory';

export * from './ConversationType';

export * from './GlobalUser';

export * from './GlobalUserType';
