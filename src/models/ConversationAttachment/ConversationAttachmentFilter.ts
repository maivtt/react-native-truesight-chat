import { IdFilter, StringFilter } from 'react3l-advanced-filters';
import { ModelFilter } from 'react3l-common';

export class ConversationAttachmentFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();

  public conversationMessageId?: IdFilter = new IdFilter();

  public conversationAttachmentTypeId?: IdFilter = new IdFilter();

  public url?: StringFilter = new StringFilter();

  public thumbnail?: StringFilter = new StringFilter();

  public size?: StringFilter = new StringFilter();

  public name?: StringFilter = new StringFilter();

  public checksum?: StringFilter = new StringFilter();

  public type?: StringFilter = new StringFilter();
}
