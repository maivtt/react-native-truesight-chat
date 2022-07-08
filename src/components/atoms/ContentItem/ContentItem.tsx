import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ContentItem.scss';
import type { StyleProp, ViewStyle } from 'react-native';
import { Platform, Pressable, View } from 'react-native';
import type { ConversationAttachment } from 'src/models/ConversationAttachment';
import ImageView from 'react-native-image-viewing';
import { useBoolean } from 'react3l-common';
import { useThemeValue } from 'react-native-redux-theming';
import ImageMessenger from './components/ImageMessenger/ImageMessenger';
import type {
  ConversationMessage,
  TruesightThemeExtension,
} from 'react-native-truesight-chat';
import { DocumentType } from '../../../types/DocumentType';
import FileMessenger from './components/FileMessenger/FileMessenger';
import Reply from './components/Reply/Reply';
import { checkFile } from '../../../helper/file-helper';
import TextLib from '../TextLib';
import ReactNativeBlobUtil, { FetchBlobResponse } from 'react-native-blob-util';
// import FileViewer from 'react-native-file-viewer';

const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';

/**
 * File: ContentItem.tsx
 * @created 2022-03-09 15:21:24
 * @author maivtt14 <vungoc2901@gmail.com>
 * @type {FC<PropsWithChildren<ContentItemProps>>}
 */
const ContentItem: FC<PropsWithChildren<ContentItemProps>> = (
  props: PropsWithChildren<ContentItemProps>
): ReactElement => {
  const { conversationMessage, onPress, onLongPress, isOther } = props;
  const [show, handleShow] = useBoolean(false);
  const primaryColor = useThemeValue('primaryColor');

  const messageBackgroundColor = useThemeValue<TruesightThemeExtension>(
    'messageBackgroundColor'
  );
  const messageBackgroundOtherColor = useThemeValue<TruesightThemeExtension>(
    'messageBackgroundOtherColor'
  );

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
              console.log('Lang.Document.Download.Success');
            })
            .catch(() => {
              console.log('Lang.Document.Download.Failed');
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
                // FileViewer.open(res.path(), {
                //   showOpenWithDialog: true,
                // }).catch(() => {
                //   console.log('Lang.Document.Download.Failed');
                // });
              }
            })
            .catch(() => {
              console.log('Lang.Document.Download.Failed');
            });
        }
      } catch (e: any) {
        console.log('Lang.Document.Download.Failed');
      }
    },
    [dirs]
  );

  return (
    <>
      {!conversationMessage?.content || conversationMessage?.content === '' ? (
        <>
          {!conversationMessage?.conversationAttachments ||
          conversationMessage?.conversationAttachments.length === 0 ? (
            <View />
          ) : (
            <>
              {checkFile(
                conversationMessage?.conversationAttachments[0]?.url
              ) !== DocumentType.IMAGE ? (
                <FileMessenger
                  isOther={isOther}
                  conversationAttachments={
                    conversationMessage?.conversationAttachments
                  }
                  onPress={
                    handlePrintOrder
                      ? handlePrintOrder(
                          conversationMessage?.conversationAttachments[0]
                        )
                      : undefined
                  }
                  onLongPress={onLongPress}
                  reply={
                    <Reply
                      conversationMessage={conversationMessage}
                      color={isOther ? '#3B3A39' : primaryColor}
                    />
                  }
                />
              ) : (
                <ImageMessenger
                  conversationMessage={conversationMessage}
                  onPress={handleShow}
                  style={[
                    {
                      backgroundColor: isOther
                        ? (messageBackgroundOtherColor as string)
                        : (messageBackgroundColor as string),
                    },
                  ]}
                />
              )}
            </>
          )}
        </>
      ) : (
        <Pressable
          style={[
            styles.width,

            {
              backgroundColor: isOther
                ? (messageBackgroundOtherColor as string)
                : (messageBackgroundColor as string),
            },
          ]}
          onPress={onPress}
        >
          <Reply conversationMessage={conversationMessage} color={'#3B3A39'} />
          <TextLib>{conversationMessage?.content}</TextLib>
        </Pressable>
      )}

      <ImageView
        images={
          conversationMessage?.conversationAttachments &&
          conversationMessage?.conversationAttachments?.length > 0
            ? conversationMessage?.conversationAttachments.map(
                (path: ConversationAttachment) => {
                  return { uri: path.url! };
                }
              )
            : []
        }
        imageIndex={0}
        visible={show}
        onRequestClose={handleShow}
      />
    </>
  );
};

export interface ContentItemProps {
  conversationMessage?: ConversationMessage;

  style?: StyleProp<ViewStyle>;

  onPress: () => void;

  onLongPress?: () => void;

  isOther?: boolean;

  onPrintOrder?: (file: ConversationAttachment | undefined) => () => void;
}

ContentItem.defaultProps = {
  //
};

ContentItem.propTypes = {
  //
};

ContentItem.displayName = nameof(ContentItem);

export default ContentItem;
