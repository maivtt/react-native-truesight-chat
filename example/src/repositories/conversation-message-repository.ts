import { server } from '../config/server';
import {
  Conversation,
  ConversationAttachment,
  ConversationAttachmentFilter,
  ConversationFile,
  ConversationFilter,
  ConversationMessage,
  ConversationMessageFilter,
  GlobalUser,
  GlobalUserFilter,
} from 'react-native-truesight-chat';
import { ConversationEndpoints } from '../config/endpoints';
import type { ImagePickerResponse } from '../core/ImageType';
import type { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { fileURICleaner, getFileName } from '../helpers/file';
import { Repository } from 'react3l-common';
import { httpConfig } from '../config/repository';
import { PLATFORM_IS_IOS } from '../config/consts';
import nameof from 'ts-nameof.macro';
import kebabCase from 'lodash/kebabCase';

export class ConversationMessageRepository extends Repository {
  constructor() {
    super(httpConfig);
    server.subscribeServerUrl((serverUrl: string) => {
      this.baseURL = new URL(
        ConversationEndpoints.MESSAGE_HREF,
        serverUrl
      ).href;
    });
  }

  public readonly count = (
    conversationMessageFilter?: ConversationMessageFilter
  ): Observable<number> => {
    return this.http
      .post<number>(kebabCase(nameof(this.count)), conversationMessageFilter)
      .pipe(Repository.responseDataMapper<number>());
  };

  public readonly list = (
    conversationMessageFilter?: ConversationMessageFilter
  ): Observable<ConversationMessage[]> => {
    return this.http
      .post<ConversationMessage[]>(
        kebabCase(nameof(this.list)),
        conversationMessageFilter
      )
      .pipe(
        Repository.responseMapToList<ConversationMessage>(ConversationMessage)
      );
  };

  public readonly get = (
    id: number | string
  ): Observable<ConversationMessage> => {
    return this.http
      .post<ConversationMessage>(kebabCase(nameof(this.get)), { id })
      .pipe(
        Repository.responseMapToModel<ConversationMessage>(ConversationMessage)
      );
  };

  public readonly create = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post<ConversationMessage>(
        kebabCase(nameof(this.create)),
        conversationMessage
      )
      .pipe(
        Repository.responseMapToModel<ConversationMessage>(ConversationMessage)
      );
  };

  public readonly update = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post<ConversationMessage>(
        kebabCase(nameof(this.update)),
        conversationMessage
      )
      .pipe(
        Repository.responseMapToModel<ConversationMessage>(ConversationMessage)
      );
  };

  public readonly delete = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return this.http
      .post<ConversationMessage>(
        kebabCase(nameof(this.delete)),
        conversationMessage
      )
      .pipe(
        Repository.responseMapToModel<ConversationMessage>(ConversationMessage)
      );
  };

  public readonly save = (
    conversationMessage: ConversationMessage
  ): Observable<ConversationMessage> => {
    return conversationMessage.id
      ? this.update(conversationMessage)
      : this.create(conversationMessage);
  };

  public readonly singleListConversation = (
    conversationFilter: ConversationFilter
  ): Observable<Conversation[]> => {
    return this.http
      .post<Conversation[]>(
        kebabCase(nameof(this.singleListConversation)),
        conversationFilter
      )
      .pipe(Repository.responseMapToList<Conversation>(Conversation));
  };

  public readonly singleListGlobalUser = (
    globalUserFilter: GlobalUserFilter
  ): Observable<GlobalUser[]> => {
    return this.http
      .post<GlobalUser[]>(
        kebabCase(nameof(this.singleListGlobalUser)),
        globalUserFilter
      )
      .pipe(Repository.responseMapToList<GlobalUser>(GlobalUser));
  };

  public readonly uploadFile = (
    image: ImagePickerResponse
  ): Observable<ConversationFile> => {
    const formData = new FormData();

    formData.append('file', {
      name: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
      filename: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
      type: image.type,
      uri: fileURICleaner(image.uri),
      timestamp: image.timestamp,
    });

    return this.http
      .post(kebabCase(nameof(this.uploadFile)), formData)
      .pipe(map((response: AxiosResponse<ConversationFile>) => response.data));
  };

  public readonly multiUploadFile = (
    images: ImagePickerResponse[]
  ): Observable<ConversationFile[]> => {
    const formData = new FormData();

    images.map((image) => {
      formData.append('files', {
        name: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
        filename: PLATFORM_IS_IOS
          ? image.fileName
          : getFileName(image.uri, true),
        type: image.type,
        uri: fileURICleaner(image.uri),
        timestamp: image.timestamp,
      });
    });

    return this.http
      .post(kebabCase(nameof(this.multiUploadFile)), formData)
      .pipe(
        map((response: AxiosResponse<ConversationFile[]>) => response.data)
      );
  };

  public readonly countConversationAttachment = (
    conversationAttachmentFilter?: ConversationAttachmentFilter
  ): Observable<number> => {
    return this.http
      .post<number>(
        kebabCase(nameof(this.countConversationAttachment)),
        conversationAttachmentFilter
      )
      .pipe(Repository.responseDataMapper<number>());
  };

  public readonly listConversationAttachment = (
    conversationAttachmentFilter?: ConversationAttachmentFilter
  ): Observable<ConversationAttachment[]> => {
    return this.http
      .post<ConversationAttachment[]>(
        kebabCase(nameof(this.listConversationAttachment)),
        conversationAttachmentFilter
      )
      .pipe(
        Repository.responseMapToList<ConversationAttachment>(
          ConversationAttachment
        )
      );
  };
}

export const conversationMessageRepository =
  new ConversationMessageRepository();
