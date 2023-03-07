import { IdFilter, ModelFilter, ObjectField, StringFilter } from 'react3l';

export class ConversationAttachmentTypeFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public code?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();
}
