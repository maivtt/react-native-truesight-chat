import { DateFilter, IdFilter, StringFilter } from 'react3l-advanced-filters';
import { ModelFilter } from 'react3l-common';

export class ConversationConfigurationFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public appId?: IdFilter = new IdFilter();
  public appSecret?: StringFilter = new StringFilter();
  public appName?: StringFilter = new StringFilter();
  public oaId?: IdFilter = new IdFilter();
  public oaToken?: StringFilter = new StringFilter();
  public oaSecretKey?: StringFilter = new StringFilter();
  public conversationTypeId?: IdFilter = new IdFilter();
  public expiredAt?: DateFilter = new DateFilter();
  public statusId?: IdFilter = new IdFilter();
}
