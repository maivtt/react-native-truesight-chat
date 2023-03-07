import { Field, Model } from 'react3l';
import type { ConversationConfiguration } from 'src/models/ConversationConfiguration';
import type { ConversationType } from 'src/models/ConversationType';
import type { GlobalUser } from 'src/models/GlobalUser';
import type { ConversationParticipant } from 'src/models/ConversationParticipant';

export class Conversation extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public conversationTypeId?: number;

  @Field(Number)
  public customerId?: number;

  @Field(String)
  public name?: string;

  @Field(String)
  public avatar?: string;

  @Field(String)
  public rowId?: string;

  @Field(Number)
  public conversationConfigurationId?: number;

  @Field(String)
  public hash?: string;

  @Field(Number)
  public latestGlobalUserId?: number;

  @Field(Number)
  public creatorId?: number;

  @Field(String)
  public latestContent?: string;

  @Field(Number)
  public countUnread?: number;

  public conversationParticipants?: ConversationParticipant[];

  public conversationConfiguration?: ConversationConfiguration;

  public conversationType?: ConversationType;

  public latestGlobalUser?: GlobalUser;

  public creator?: GlobalUser;
}
