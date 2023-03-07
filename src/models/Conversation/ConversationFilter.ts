import {
  DateFilter,
  GuidFilter,
  IdFilter,
  ModelFilter,
  ObjectField,
  StringFilter,
} from 'react3l';

export class ConversationFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public conversationTypeId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public conversationConfigurationId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public customerId?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public avatar?: StringFilter = new StringFilter();
  @ObjectField(DateFilter)
  public createdAt?: DateFilter = new DateFilter();
  @ObjectField(DateFilter)
  public updatedAt?: DateFilter = new DateFilter();
  @ObjectField(GuidFilter)
  public rowId?: GuidFilter = new GuidFilter();
  @ObjectField(StringFilter)
  public hash?: StringFilter = new StringFilter();
  @ObjectField(IdFilter)
  public latestGlobalUserId?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public latestContent?: StringFilter = new StringFilter();
}
