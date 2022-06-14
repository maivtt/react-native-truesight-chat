import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './Reply.scss';
import type { StyleProp, ViewProps } from 'react-native';
import { Image, View, Text } from 'react-native';
import atomicStyles from '../../../../../styles';
import type { ConversationMessage } from 'src/models/ConversationMessage';
import FileIcon from '../../../../../icons/FileIcon';
import { checkFile } from '../../../../../helper/file-helper';
import { DocumentType } from '../../../../../types/DocumentType';

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

  const content = (
    <>
      <Text
        numberOfLines={1}
        style={[styles.subReTextColor, atomicStyles.semibold, { color: color }]}
      >{`${conversationMessage?.reply?.globalUser?.displayName}`}</Text>
      <Text numberOfLines={3}>{conversationMessage?.reply?.content}</Text>
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
                { color: color, fontSize: 10 },
              ]}
            >{`${conversationMessage?.reply?.globalUser?.displayName}`}</Text>
            <Text
              numberOfLines={3}
              style={[
                checkFile(
                  conversationMessage?.reply?.conversationAttachments[0]?.url
                ) !== DocumentType.IMAGE && atomicStyles.textUnderline,
                { fontSize: 10 },
              ]}
            >
              {checkFile(
                conversationMessage?.reply?.conversationAttachments[0]?.url
              ) !== DocumentType.IMAGE
                ? conversationMessage?.reply?.conversationAttachments[0]?.name
                : 'Photo'}
            </Text>
          </View>
        </View>
      );
    }
    return <View />;
  }, [color, conversationMessage]);

  return (
    <>
      {conversationMessage?.replyId && (
        <View style={[styles.dash, { borderLeftColor: '#3B3A39' }, style]}>
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
