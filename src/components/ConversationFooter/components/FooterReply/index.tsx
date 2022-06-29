import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './FooterReply.scss';
import nameof from 'ts-nameof.macro';
import { Image, TouchableOpacity, View } from 'react-native';
import TruesightChat, {
  ConversationMessage,
} from 'react-native-truesight-chat';
import { DocumentType } from '../../../../types/DocumentType';
import { checkFile } from '../../../../helper/file-helper';
import TextLib from '../../../atoms/TextLib';
import SvgIcon from '../../../atoms/SvgIcon/SvgIcon';

export function FooterReply(
  props: PropsWithChildren<FooterReplyProps>
): ReactElement {
  const { conversationMessage, onCancel, replyLabel } = props;
  const { atomicStyles } = TruesightChat;

  const reMessengerContent = React.useMemo(() => {
    if (conversationMessage) {
      if (conversationMessage?.content) {
        return conversationMessage?.content;
      }
      if (
        conversationMessage?.conversationAttachments &&
        conversationMessage?.conversationAttachments?.length > 0
      ) {
        if (
          checkFile(conversationMessage?.conversationAttachments[0]?.name) ===
          DocumentType.IMAGE
        ) {
          return 'Photo';
        }
        return conversationMessage?.conversationAttachments[0]?.name;
      }
    }
    return 'Tệp đính kèm';
  }, [conversationMessage]);

  const replyComponent = React.useMemo(() => {
    if (
      conversationMessage?.conversationAttachments &&
      conversationMessage?.conversationAttachments?.length > 0
    ) {
      return (
        <View style={[atomicStyles.flexRow, atomicStyles.alignItemsCenter]}>
          {checkFile(conversationMessage?.conversationAttachments[0]?.url) !==
          DocumentType.IMAGE ? (
            <View />
          ) : (
            <Image
              source={{
                uri: conversationMessage?.conversationAttachments[0]?.url,
              }}
              style={styles.imageComponent}
            />
          )}
        </View>
      );
    }
    return <View />;
  }, [atomicStyles, conversationMessage]);

  return (
    <>
      <View style={styles.dash}>
        <View style={[atomicStyles.flex]}>
          <View style={[atomicStyles.flexRow, atomicStyles.mb1]}>
            <TextLib>{replyLabel ?? 'Reply '}</TextLib>
            <TextLib style={[atomicStyles.semibold]}>
              {conversationMessage?.globalUser?.displayName}
            </TextLib>
          </View>
          <TextLib numberOfLines={1} style={[atomicStyles.pr2]}>
            {reMessengerContent}
          </TextLib>
        </View>
        <View>{replyComponent}</View>
        <TouchableOpacity style={[atomicStyles.pl2]} onPress={onCancel}>
          <SvgIcon
            component={require('../../../../../assets/icons/closed-filter.svg')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export interface FooterReplyProps {
  conversationMessage: ConversationMessage;

  onCancel?: () => void;

  replyLabel?: string;
}

FooterReply.defaultProps = {
  //
};

FooterReply.displayName = nameof(FooterReply);

export default FooterReply;
