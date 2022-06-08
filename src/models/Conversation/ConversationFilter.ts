import { GuidFilter, IdFilter, StringFilter } from 'react3l-advanced-filters';
import { ModelFilter } from 'react3l-common';

export class ConversationFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public conversationTypeId?: IdFilter = new IdFilter();
  public customerId?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public avatar?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
  public conversationConfigurationId?: IdFilter = new IdFilter();
  public hash?: StringFilter = new StringFilter();
  public latestGlobalUserId?: IdFilter = new IdFilter();
  public latestContent?: StringFilter = new StringFilter();
}
