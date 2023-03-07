import { IdFilter, ModelFilter, ObjectField, StringFilter } from 'react3l';

export class ConversationMessageFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();

  @ObjectField(IdFilter)
  public conversationId?: IdFilter = new IdFilter();

  @ObjectField(IdFilter)
  public globalUserId?: IdFilter = new IdFilter();

  @ObjectField(StringFilter)
  public content?: StringFilter = new StringFilter();
}
