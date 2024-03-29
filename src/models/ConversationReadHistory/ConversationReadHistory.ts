import { Field, Model, MomentField } from 'react3l';
import type { Moment } from 'moment';
import type { Conversation } from 'src/models/Conversation';
import type { GlobalUser } from 'src/models/GlobalUser';

export class ConversationReadHistory extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public conversationId?: number;

  @Field(Number)
  public globalUserId?: number;

  @MomentField()
  public readAt?: Moment;

  public conversation?: Conversation;

  public globalUser?: GlobalUser;
}
