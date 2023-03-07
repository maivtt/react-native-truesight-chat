import { Field, Model } from 'react3l';
import type { AttachmentType } from 'src/models/AttachmentType';
import type { ConversationMessage } from 'src/models/ConversationMessage';

export class ConversationAttachment extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public conversationMessageId?: number;

  @Field(Number)
  public conversationAttachmentTypeId?: number;

  @Field(String)
  public url?: string;

  @Field(String)
  public thumbnail?: string;

  @Field(String)
  public size?: string;

  @Field(String)
  public name?: string;

  @Field(String)
  public checksum?: string;

  @Field(String)
  public type?: string;

  public conversationAttachmentType?: AttachmentType;

  public conversationMessage?: ConversationMessage;
}
