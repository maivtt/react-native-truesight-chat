// import React from 'react';
// import type { ConversationAttachment } from 'react-native-truesight-chat';
// import { showError, showInfo, showSuccess } from '../helpers/toast-helper';
// import { PLATFORM_IS_ANDROID } from '../config/consts';
// import type { FetchBlobResponse } from 'react-native-blob-util';
// import ReactNativeBlobUtil from 'react-native-blob-util';
// import FileViewer from 'react-native-file-viewer';
//
// export function useDownloadFile(): [
//   (file: ConversationAttachment | undefined) => () => void
// ] {
//   let dirs = ReactNativeBlobUtil?.fs?.dirs;
//
//   const handlePrintOrder = React.useCallback(
//     (file: ConversationAttachment | undefined) => () => {
//       if (!file) {
//         showInfo('');
//         return;
//       }
//       try {
//         if (PLATFORM_IS_ANDROID) {
//           ReactNativeBlobUtil.config({
//             appendExt:
//               file?.name?.split('.')[file?.name?.split('.').length - 1],
//             fileCache: true,
//             overwrite: true,
//             addAndroidDownloads: {
//               title: file?.name,
//               useDownloadManager: true,
//               notification: true,
//               path: dirs.DownloadDir + '/' + file?.name,
//             },
//           })
//             .fetch('GET', `${file?.url}`)
//             .then((_res: any) => {
//               showSuccess('Lang.Document.Download.Success');
//             })
//             .catch(() => {
//               showError('Lang.Document.Download.Failed');
//             });
//         } else {
//           ReactNativeBlobUtil.config({
//             appendExt:
//               file?.name?.split('.')[file?.name?.split('.').length - 1],
//             fileCache: true,
//             overwrite: true,
//             indicator: true,
//             path: `${dirs?.DocumentDir}/${file?.name}`,
//             IOSBackgroundTask: true,
//           })
//             .fetch('GET', `${file?.url}`)
//             .then(async (res: FetchBlobResponse) => {
//               // PushNotification.configure({});
//               // PushNotification.localNotification({
//               //   title: '',
//               //   message: translate(Lang.Document.Download.Success),
//               // });
//               const state = await ReactNativeBlobUtil.fs.exists(res.path());
//               if (state) {
//                 FileViewer.open(res.path(), {
//                   showOpenWithDialog: true,
//                 }).catch(() => {
//                   showError('Lang.Document.Download.Failed');
//                 });
//               }
//             })
//             .catch(() => {
//               showError('Lang.Document.Download.Failed');
//             });
//         }
//       } catch (e: any) {
//         showError('Lang.Document.Download.Failed');
//       }
//     },
//     [dirs]
//   );
//   return [handlePrintOrder];
// }

export function useDownloadFile() {}
