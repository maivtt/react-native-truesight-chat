import { Field, Model } from 'react3l';

export class ConversationType extends Model {
  @Field(Number)
  public id?: number;

  @Field(String)
  public code?: string;

  @Field(String)
  public name?: string;
}
