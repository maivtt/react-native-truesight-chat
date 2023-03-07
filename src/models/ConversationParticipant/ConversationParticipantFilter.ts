import { IdFilter, ModelFilter, ObjectField } from 'react3l';

export class ConversationParticipantFilter extends ModelFilter {
  @ObjectField(IdFilter)
  public id?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public conversationId?: IdFilter = new IdFilter();
  @ObjectField(IdFilter)
  public globalUserId?: IdFilter = new IdFilter();
}
