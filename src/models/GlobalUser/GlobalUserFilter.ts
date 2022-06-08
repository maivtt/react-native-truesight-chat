import { GuidFilter, IdFilter, StringFilter } from 'react3l-advanced-filters';
import { ModelFilter } from 'react3l-common';

export class GlobalUserFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public globalUserTypeId?: IdFilter = new IdFilter();
  public username?: StringFilter = new StringFilter();
  public displayName?: StringFilter = new StringFilter();
  public avatar?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
