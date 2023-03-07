import { Field, Model } from 'react3l';

export class ConversationFile extends Model {
  @Field(Number)
  public id?: number;
  @Field(String)
  public name?: string;
  @Field(Boolean)
  public isFile?: boolean;
  @Field(String)
  public path?: string;
  @Field(Number)
  public level?: number;
  @Field(String)
  public rowId?: string;
}
