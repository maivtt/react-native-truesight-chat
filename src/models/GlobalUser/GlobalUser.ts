import { Field, Model } from 'react3l';
import type { GlobalUserType } from 'src/models/GlobalUserType';

export class GlobalUser extends Model {
  @Field(Number)
  public id?: number;

  @Field(Number)
  public globalUserTypeId?: number;

  @Field(String)
  public username?: string;

  @Field(String)
  public displayName?: string;

  @Field(String)
  public avatar?: string;

  @Field(String)
  public rowId?: string;

  public globalUserType?: GlobalUserType;
}
