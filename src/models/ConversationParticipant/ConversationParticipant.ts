import { Model } from 'react3l-common';
import { Field } from 'react3l-decorators';
import type { Conversation } from 'src/models/Conversation';
import type { GlobalUser } from 'src/models/GlobalUser';

export class ConversationParticipant extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public conversationId?: number;

  @Field(Number)
  public globalUserId?: number;

  public conversation?: Conversation;

  public globalUser?: GlobalUser;
}
