import { IdFilter, StringFilter } from 'react3l-advanced-filters';
import { ModelFilter } from 'react3l-common';

export class ConversationMessageFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public conversationId?: IdFilter = new IdFilter();

  public globalUserId?: IdFilter = new IdFilter();

  public content?: StringFilter = new StringFilter();
}
