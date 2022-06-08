export enum MessageType {
  Success,
  Pending,
  Error,
  Info,
  Loading,
}

export type DialogType = 'Loading' | 'Error' | 'Success' | 'Info';

export interface DialogMessage {
  committed?: boolean;
  type?: MessageType;
  message?: string;
  display?: boolean;
}

export enum AttachmentType {
  Image = 1,
  Sticker,
  File,
  URL,
  None,
}
