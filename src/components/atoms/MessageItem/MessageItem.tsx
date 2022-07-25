import type { FC, PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { Image, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import type { ConversationMessage } from 'src/models/ConversationMessage';
import styles from './MessageItem.scss';
import { useBoolean } from 'react3l-common';
import moment from 'moment';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import ContentItem from '../ContentItem/ContentItem';
import SvgIcon from '../SvgIcon/SvgIcon';
import TextLib from '../TextLib';
import { useThemeValue } from 'react-native-redux-theming';
import type { TruesightThemeExtension } from 'react-native-truesight-chat';
import TruesightChat from 'react-native-truesight-chat';

/**
 * File: MessageItem.tsx
 * @created 2022-03-03 19:28:46
 * @author maivtt14 <vungoc2901@gmail.com>
 * @type {FC<PropsWithChildren<MessageItemProps>>}
 */
const MessageItem: FC<PropsWithChildren<MessageItemProps>> = (
  props: PropsWithChildren<MessageItemProps>
): ReactElement => {
  const {
    conversationMessage,
    consecutive,
    onSwipe,
    header,
    globalUser,
    dateStyle,
  } = props;
  const { atomicStyles } = TruesightChat;
  const messageTextSecondaryColor = useThemeValue<TruesightThemeExtension>(
    'messageTextSecondaryColor'
  );

  const [show, handleShow] = useBoolean(false);

  const [swipe, handleOpenSwipe, handleCloseSwipe] = useBoolean(false);

  const startingPosition = 0;
  const x = useSharedValue(startingPosition);

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  return (
    <>
      {swipe && (
        <View
          style={[
            styles.reply,
            conversationMessage?.globalUserId === globalUser?.id
              ? styles.right
              : styles.left,
            (header || show) && styles.top,
          ]}
        >
          <SvgIcon
            component={require('../../../../assets/icons/reply-svgrepo-com.svg')}
          />
        </View>
      )}

      <FlingGestureHandler
        direction={
          conversationMessage?.globalUserId === globalUser?.id
            ? Directions.LEFT
            : Directions.RIGHT
        }
        onBegan={() => {
          handleOpenSwipe();
        }}
        onActivated={() => {
          x.value =
            conversationMessage?.globalUserId !== globalUser?.id ? 70 : -70;
        }}
        onEnded={() => {
          x.value = withSpring(startingPosition);
          handleCloseSwipe();
        }}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            if (onSwipe) {
              onSwipe(conversationMessage);
            }
          }
        }}
      >
        <Animated.View style={[uas]}>
          <>
            {conversationMessage?.globalUserId === globalUser?.id ? (
              <View style={[styles.container, atomicStyles.flexRowEnd]}>
                <ContentItem
                  conversationMessage={conversationMessage}
                  onPress={handleShow}
                  onLongPress={() => {
                    if (onSwipe) {
                      onSwipe(conversationMessage);
                    }
                  }}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.container,
                  atomicStyles.flexRow,
                  atomicStyles.alignItemsEnd,
                ]}
              >
                <View style={styles.avatar}>
                  {!consecutive && (
                    <Image
                      style={[
                        atomicStyles.w100,
                        atomicStyles.h100,
                        styles.borderRadius,
                      ]}
                      source={
                        conversationMessage?.globalUser?.avatar
                          ? {
                              uri:
                                TruesightChat.serverUrl +
                                conversationMessage.globalUser.avatar,
                            }
                          : require('../../../../assets/images/default-avatar.png')
                      }
                    />
                  )}
                </View>
                <ContentItem
                  conversationMessage={conversationMessage}
                  onPress={handleShow}
                  isOther={true}
                  onLongPress={() => {
                    if (onSwipe) {
                      onSwipe(conversationMessage);
                    }
                  }}
                />
              </View>
            )}
          </>
        </Animated.View>
      </FlingGestureHandler>
      {show && !header && (
        <TextLib
          style={[
            atomicStyles.textCenter,
            atomicStyles.mt4,
            atomicStyles.mb2,
            atomicStyles.text,
            messageItemStyles.font12,
            { color: messageTextSecondaryColor },
            dateStyle,
          ]}
        >
          {moment(conversationMessage?.createdAt).format('LLL')}
        </TextLib>
      )}
      {header}
    </>
  );
};

export interface MessageItemProps {
  globalUser: any;

  conversationMessage: ConversationMessage;

  consecutive?: boolean;

  onSwipe?: (conversationMessage: ConversationMessage) => void;

  header?: ReactElement;

  dateStyle?: StyleProp<TextStyle>;
}

const messageItemStyles = StyleSheet.create({
  font12: {
    fontSize: 12,
  },
});

MessageItem.defaultProps = {
  //
};

MessageItem.propTypes = {
  //
};

MessageItem.displayName = nameof(MessageItem);

export default MessageItem;
