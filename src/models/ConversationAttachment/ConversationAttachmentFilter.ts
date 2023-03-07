import { IdFilter, ModelFilter, ObjectField, StringFilter } from 'react3l';

export class ConversationAttachmentFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public conversationMessageId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public conversationAttachmentTypeId?: IdFilter = new IdFilter();
  @ObjectField(StringFilter)
  public name?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public type?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public size?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public url?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public thumbnail?: StringFilter = new StringFilter();
  @ObjectField(StringFilter)
  public checksum?: StringFilter = new StringFilter();
}
