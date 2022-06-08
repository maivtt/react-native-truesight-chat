import { Model } from 'react3l-common';
import { Field, MomentField } from 'react3l-decorators';
import type { Moment } from 'moment';
import type { ConversationType } from 'src/models/ConversationType';
import type { Status } from 'src/models/Status';

export class ConversationConfiguration extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public appId?: number;

  @Field(String)
  public appSecret?: string;

  @Field(String)
  public appName?: string;

  @Field(Number)
  public oaId?: number;

  @Field(String)
  public oaToken?: string;

  @Field(String)
  public oaSecretKey?: string;

  @Field(Number)
  public conversationTypeId?: number;

  @MomentField()
  public expiredAt?: Moment;

  @Field(Number)
  public statusId?: number;

  public conversationType?: ConversationType;

  public status?: Status;
}
