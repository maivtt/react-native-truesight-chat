import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './ImageMessenger.scss';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import type { ConversationMessage } from 'src/models/ConversationMessage';
import Reply from '../Reply/Reply';
import TruesightChat from 'react-native-truesight-chat';

/**
 * File: ImageMessenger.tsx
 * @created 2022-05-24 09:11:00
 * @author maivtt14 <vungoc2901@gmail.com>
 * @type {FC<PropsWithChildren<ImageMessengerProps>>}
 */
const ImageMessenger: FC<PropsWithChildren<ImageMessengerProps>> = (
  props: PropsWithChildren<ImageMessengerProps>
): ReactElement => {
  const { conversationMessage, onPress, style } = props;
  const { atomicStyles } = TruesightChat;

  return (
    <View
      style={[
        atomicStyles.mt2,
        conversationMessage?.replyId && atomicStyles.pt2,
        // eslint-disable-next-line react-native/no-inline-styles
        { borderRadius: 8 },
        style,
      ]}
    >
      {conversationMessage?.replyId && (
        <View
          style={[
            conversationMessage?.conversationAttachments &&
            conversationMessage?.conversationAttachments?.length > 1
              ? styles.w200
              : styles.w150,
          ]}
        >
          <Reply
            conversationMessage={conversationMessage}
            style={atomicStyles.ml4}
          />
        </View>
      )}
      <TouchableOpacity
        style={conversationMessage?.replyId && atomicStyles.mt1}
        onPress={onPress}
      >
        {conversationMessage?.conversationAttachments?.length === 1 ? (
          <Image
            source={{
              uri: conversationMessage?.conversationAttachments[0]?.url,
            }}
            style={[
              styles.image,
              !conversationMessage?.replyId && styles.borderTopLeft,
              !conversationMessage?.replyId && styles.borderTopRight,
            ]}
          />
        ) : (
          <View>
            <View style={[atomicStyles.flexRow]}>
              {conversationMessage?.conversationAttachments &&
                conversationMessage?.conversationAttachments[0] && (
                  <Image
                    source={{
                      uri: conversationMessage?.conversationAttachments[0]?.url,
                    }}
                    style={[
                      styles.imageComponent,
                      !conversationMessage?.replyId && styles.borderTopLeft,
                      conversationMessage?.conversationAttachments?.length ===
                        2 && styles.borderBottomLeft,
                    ]}
                  />
                )}
              {conversationMessage?.conversationAttachments &&
                conversationMessage?.conversationAttachments[1] && (
                  <Image
                    source={{
                      uri: conversationMessage?.conversationAttachments[1]?.url,
                    }}
                    style={[
                      styles.imageComponent,
                      !conversationMessage?.replyId && styles.borderTopRight,
                      conversationMessage?.conversationAttachments?.length ===
                        2 && styles.borderBottomRight,
                    ]}
                  />
                )}
            </View>
            <View style={[atomicStyles.flexRow]}>
              {conversationMessage?.conversationAttachments &&
                conversationMessage?.conversationAttachments[2] && (
                  <Image
                    source={{
                      uri: conversationMessage?.conversationAttachments[2]?.url,
                    }}
                    style={[styles.imageComponent, styles.borderBottomLeft]}
                  />
                )}
              {conversationMessage?.conversationAttachments &&
              conversationMessage?.conversationAttachments?.length > 4 ? (
                <View
                  style={[
                    atomicStyles.justifyContentCenter,
                    atomicStyles.alignItemsCenter,
                  ]}
                >
                  <View
                    style={[styles.countContainer, styles.borderBottomRight]}
                  >
                    <Text style={[atomicStyles.textWhite, atomicStyles.h3]}>
                      +{conversationMessage?.conversationAttachments.length - 4}
                    </Text>
                  </View>
                  <Image
                    source={{
                      uri: conversationMessage?.conversationAttachments[3]?.url,
                    }}
                    style={[styles.imageComponent, styles.borderBottomRight]}
                  />
                </View>
              ) : (
                conversationMessage?.conversationAttachments &&
                conversationMessage?.conversationAttachments[3] && (
                  <Image
                    source={{
                      uri: conversationMessage?.conversationAttachments[3]?.url,
                    }}
                    style={[styles.imageComponent, styles.borderBottomRight]}
                  />
                )
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export interface ImageMessengerProps {
  conversationMessage?: ConversationMessage;

  onPress?: () => void;

  reply?: ReactElement;

  style?: StyleProp<ViewStyle>;
}

ImageMessenger.defaultProps = {
  //
};

ImageMessenger.propTypes = {
  //
};

ImageMessenger.displayName = nameof(ImageMessenger);

export default ImageMessenger;
