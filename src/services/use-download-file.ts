import React from 'react';
import type { FetchBlobResponse } from 'react-native-blob-util';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useTranslation } from 'react-i18next';
import FileViewer from 'react-native-file-viewer';
import type { ConversationAttachment } from 'src/models/ConversationAttachment';
import { Platform } from 'react-native';
const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';

export function useDownloadFile(): [
  (file: ConversationAttachment | undefined) => () => void
] {
  const [translate] = useTranslation();

  let dirs = ReactNativeBlobUtil?.fs?.dirs;

  const handlePrintOrder = React.useCallback(
    (file: ConversationAttachment | undefined) => () => {
      if (!file) {
        return;
      }
      try {
        if (PLATFORM_IS_ANDROID) {
          ReactNativeBlobUtil.config({
            appendExt:
              file?.name?.split('.')[file?.name?.split('.').length - 1],
            fileCache: true,
            overwrite: true,
            addAndroidDownloads: {
              title: file?.name,
              useDownloadManager: true,
              notification: true,
              path: dirs.DownloadDir + '/' + file?.name,
            },
          })
            .fetch('GET', `${file?.url}`)
            .then((_res: any) => {
              translate('Lang.Document.Download.Success');
            })
            .catch(() => {
              translate('Lang.Document.Download.Failed');
            });
        } else {
          ReactNativeBlobUtil.config({
            appendExt:
              file?.name?.split('.')[file?.name?.split('.').length - 1],
            fileCache: true,
            overwrite: true,
            indicator: true,
            path: `${dirs?.DocumentDir}/${file?.name}`,
            IOSBackgroundTask: true,
          })
            .fetch('GET', `${file?.url}`)
            .then(async (res: FetchBlobResponse) => {
              // PushNotification.configure({});
              // PushNotification.localNotification({
              //   title: '',
              //   message: translate(Lang.Document.Download.Success),
              // });
              const state = await ReactNativeBlobUtil.fs.exists(res.path());
              if (state) {
                FileViewer.open(res.path(), {
                  showOpenWithDialog: true,
                }).catch(() => {
                  translate('Lang.Document.Download.Failed');
                });
              }
            })
            .catch(() => {
              translate('Lang.Document.Download.Failed');
            });
        }
      } catch (e: any) {
        translate('Lang.Document.Download.Failed');
      }
    },
    [dirs, translate]
  );
  return [handlePrintOrder];
}