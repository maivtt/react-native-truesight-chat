import { Model } from 'react3l-common';
import { Field } from 'react3l-decorators';
import type { Conversation } from 'src/models/Conversation';
import type { GlobalUser } from 'src/models/GlobalUser';
import type { ConversationAttachment } from 'src/models/ConversationAttachment';

export class ConversationMessage extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public conversationId?: number;

  @Field(Number)
  public globalUserId?: number;

  @Field(Number)
  public replyId?: number;

  @Field(String)
  public content?: string;

  public reply?: ConversationMessage;

  public conversation?: Conversation;

  public globalUser?: GlobalUser;

  public conversationAttachments?: ConversationAttachment[];
}
