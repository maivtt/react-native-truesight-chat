import {
  DateFilter,
  IdFilter,
  ModelFilter,
  ObjectField,
  StringFilter,
} from 'react3l';

export class ConversationConfigurationFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public appId?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public appSecret?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public appName?: StringFilter = new StringFilter();
  @ObjectField(IdFilter)
  public oaId?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public oaToken?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public oaSecretKey?: StringFilter = new StringFilter();

  @ObjectField(IdFilter)
  public conversationTypeId?: IdFilter = new IdFilter();
  public expiredAt?: DateFilter = new DateFilter();

  @ObjectField(IdFilter)
  public statusId?: IdFilter = new IdFilter();
}
