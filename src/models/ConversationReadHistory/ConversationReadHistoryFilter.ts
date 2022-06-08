import { DateFilter, IdFilter } from 'react3l-advanced-filters';
import { ModelFilter } from 'react3l-common';

export class ConversationReadHistoryFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public conversationId?: IdFilter = new IdFilter();
  public globalUserId?: IdFilter = new IdFilter();
  public readAt?: DateFilter = new DateFilter();
}
