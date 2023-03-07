import {
  GuidFilter,
  IdFilter,
  ModelFilter,
  ObjectField,
  StringFilter,
} from 'react3l';

export class GlobalUserFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public globalUserTypeId?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public username?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public displayName?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public avatar?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
