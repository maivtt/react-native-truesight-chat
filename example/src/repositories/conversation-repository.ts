import { server } from '../config/server';
import {
  Conversation,
  ConversationConfiguration,
  ConversationConfigurationFilter,
  ConversationFile,
  ConversationFilter,
  ConversationType,
  ConversationTypeFilter,
  GlobalUser,
  GlobalUserFilter,
} from 'react-native-truesight-chat';
import type { AxiosResponse } from 'axios';
import {
  fileURICleaner,
  getFileName,
  getFileNameForUploading,
} from '../helpers/file';
import { httpConfig } from '../config/repository';
import nameof from 'ts-nameof.macro';
import { map, Observable } from 'rxjs';
import { ConversationEndpoints } from '../config/endpoints';
import type { ImagePickerResponse } from '../core/ImageType';
import type { DocumentPickerResponse } from 'react-native-document-picker';
import { Repository } from 'react3l-common';
import { PLATFORM_IS_IOS } from '../config/consts';
import kebabCase from 'lodash/kebabCase';
import type { Image } from 'react-native-image-crop-picker';

export class ConversationRepository extends Repository {
  constructor() {
    super(httpConfig);
    server.subscribeServerUrl((serverUrl: string) => {
      this.baseURL = new URL(ConversationEndpoints.BASE_HREF, serverUrl).href;
    });
  }

  public readonly getGlobalUser = (
    globalUser: GlobalUser
  ): Observable<GlobalUser> => {
    return this.http
      .post(kebabCase(nameof(this.getGlobalUser)), globalUser)
      .pipe(map((response: AxiosResponse<GlobalUser>) => response.data));
  };

  public readonly count = (
    conversationFilter?: ConversationFilter
  ): Observable<number> => {
    return this.http
      .post<number>(kebabCase(nameof(this.count)), conversationFilter)
      .pipe(Repository.responseDataMapper<number>());
  };

  public readonly list = (
    conversationFilter?: ConversationFilter
  ): Observable<Conversation[]> => {
    return this.http
      .post<Conversation[]>(kebabCase(nameof(this.list)), conversationFilter)
      .pipe(Repository.responseMapToList<Conversation>(Conversation));
  };

  public readonly get = (id: number): Observable<Conversation> => {
    return this.http
      .post<Conversation>(kebabCase(nameof(this.get)), { id })
      .pipe(Repository.responseMapToModel<Conversation>(Conversation));
  };

  public readonly create = (
    conversation: Conversation
  ): Observable<Conversation> => {
    return this.http
      .post<Conversation>(kebabCase(nameof(this.create)), conversation)
      .pipe(Repository.responseMapToModel<Conversation>(Conversation));
  };

  public readonly update = (
    conversation: Conversation
  ): Observable<Conversation> => {
    return this.http
      .post<Conversation>(kebabCase(nameof(this.update)), conversation)
      .pipe(Repository.responseMapToModel<Conversation>(Conversation));
  };

  public readonly delete = (
    conversation: Conversation
  ): Observable<Conversation> => {
    return this.http
      .post<Conversation>(kebabCase(nameof(this.delete)), conversation)
      .pipe(Repository.responseMapToModel<Conversation>(Conversation));
  };

  public readonly singleListConversationConfiguration = (
    conversationConfigurationFilter: ConversationConfigurationFilter
  ): Observable<ConversationConfiguration[]> => {
    return this.http
      .post<ConversationConfiguration[]>(
        kebabCase(nameof(this.singleListConversationConfiguration)),
        conversationConfigurationFilter
      )
      .pipe(
        Repository.responseMapToList<ConversationConfiguration>(
          ConversationConfiguration
        )
      );
  };

  public readonly singleListConversationType = (
    conversationTypeFilter: ConversationTypeFilter
  ): Observable<ConversationType[]> => {
    return this.http
      .post<ConversationType[]>(
        kebabCase(nameof(this.singleListConversationType)),
        conversationTypeFilter
      )
      .pipe(Repository.responseMapToList<ConversationType>(ConversationType));
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
      .post<ConversationFile>(kebabCase(nameof(this.uploadFile)), formData)
      .pipe(map((response: AxiosResponse<ConversationFile>) => response.data));
  };

  public readonly multiUploadFile = (
    images: ImagePickerResponse[] | DocumentPickerResponse[]
  ): Observable<ConversationFile[]> => {
    const formData = new FormData();

    images.map((image) => {
      if ('fileName' in image) {
        formData.append('files', {
          name: PLATFORM_IS_IOS ? image.fileName : getFileName(image.uri, true),
          filename: PLATFORM_IS_IOS
            ? image.fileName
            : getFileName(image.uri, true),
          type: image.type,
          uri: fileURICleaner(image.uri),
          timestamp: image.timestamp,
        } as any);
      } else {
        formData.append('files', {
          name: image.name,
          filename: image.name,
          type: image.type,
          uri: image.uri,
          timestamp: new Date().getTime(),
        } as any);
      }
    });

    return this.http
      .post<ConversationFile[]>(
        kebabCase(nameof(this.multiUploadFile)),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
      .pipe(
        map((response: AxiosResponse<ConversationFile[]>) => response.data)
      );
  };

  public readonly uploadAvatar = (
    image: Image,
    conversationId: number
  ): Observable<Conversation> => {
    const formData = new FormData();

    formData.append('file', {
      name: PLATFORM_IS_IOS
        ? getFileNameForUploading(image.sourceURL!)
        : getFileNameForUploading(image.path),
      uri: fileURICleaner(image.path),
      type: image.mime,
      timestamp: image.modificationDate,
    } as any);

    formData.append('ConversationId', conversationId);

    return this.http
      .post(kebabCase(nameof(this.uploadAvatar)), formData)
      .pipe(map((response: AxiosResponse<Conversation>) => response.data));
  };
}

export const conversationRepository = new ConversationRepository();
