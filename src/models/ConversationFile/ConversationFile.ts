import { Model } from 'react3l-common';

export class ConversationFile extends Model {
  public id?: number;

  public name?: string;

  public isFile?: boolean;

  public path?: string;

  public level?: number;

  public rowId?: string;
}
