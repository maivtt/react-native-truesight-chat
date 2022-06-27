import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Reply.scss';
import type { StyleProp, ViewProps } from 'react-native';
import { Image, Text, View } from 'react-native';
import type { ConversationMessage } from 'src/models/ConversationMessage';
import FileIcon from '../../../../../icons/FileIcon';
import { checkFile } from '../../../../../helper/file-helper';
import { DocumentType } from '../../../../../types/DocumentType';
import TextLib from '../../../TextLib';
import TruesightChat from 'react-native-truesight-chat';

const REPLY_FONT_SIZE = 12;

/**
 * File: Reply.tsx
 * @created 2022-05-24 09:33:33
 * @author maivtt14 <vungoc2901@gmail.com>
 * @type {FC<PropsWithChildren<ReplyProps>>}
 */
const Reply: FC<PropsWithChildren<ReplyProps>> = (
  props: PropsWithChildren<ReplyProps>
): ReactElement => {
  const { conversationMessage, color, style } = props;
  const { atomicStyles } = TruesightChat;

  const content = (
    <>
      <TextLib
        numberOfLines={1}
        style={[
          styles.subReTextColor,
          atomicStyles.semibold,
          { color: color, fontSize: REPLY_FONT_SIZE },
        ]}
      >{`${conversationMessage?.reply?.globalUser?.displayName}`}</TextLib>
      <TextLib numberOfLines={3} style={{ fontSize: REPLY_FONT_SIZE }}>
        {conversationMessage?.reply?.content}
      </TextLib>
    </>
  );

  const replyComponent = React.useMemo(() => {
    if (
      conversationMessage?.replyId &&
      conversationMessage?.reply?.conversationAttachments &&
      conversationMessage?.reply?.conversationAttachments?.length > 0
    ) {
      return (
        <View style={[atomicStyles.flexRow, atomicStyles.alignItemsCenter]}>
          {checkFile(
            conversationMessage?.reply?.conversationAttachments[0]?.url
          ) !== DocumentType.IMAGE ? (
            <View style={styles.file}>
              <FileIcon size={30} color={'#000'} />
            </View>
          ) : (
            <Image
              source={{
                uri: conversationMessage?.reply?.conversationAttachments[0]
                  ?.url,
              }}
              style={styles.imageComponent}
            />
          )}
          <View style={atomicStyles.flexCol}>
            <Text
              numberOfLines={1}
              style={[
                styles.subReTextColor,
                atomicStyles.semibold,
                { color: color, fontSize: REPLY_FONT_SIZE },
              ]}
            >{`${conversationMessage?.reply?.globalUser?.displayName}`}</Text>
            <TextLib
              numberOfLines={3}
              style={[
                checkFile(
                  conversationMessage?.reply?.conversationAttachments[0]?.url
                ) !== DocumentType.IMAGE && atomicStyles.textUnderline,
                { fontSize: REPLY_FONT_SIZE },
              ]}
            >
              {checkFile(
                conversationMessage?.reply?.conversationAttachments[0]?.url
              ) !== DocumentType.IMAGE
                ? conversationMessage?.reply?.conversationAttachments[0]?.name
                : 'Photo'}
            </TextLib>
          </View>
        </View>
      );
    }
    return <View />;
  }, [atomicStyles, color, conversationMessage]);

  return (
    <>
      {conversationMessage?.replyId && (
        <View style={[styles.dash, style]}>
          {conversationMessage?.replyId && conversationMessage?.reply?.content
            ? content
            : replyComponent}
        </View>
      )}
    </>
  );
};

export interface ReplyProps {
  conversationMessage?: ConversationMessage;

  color?: string;

  style?: StyleProp<ViewProps>;
}

Reply.defaultProps = {
  //
};

Reply.propTypes = {
  //
};

Reply.displayName = nameof(Reply);

export default Reply;
