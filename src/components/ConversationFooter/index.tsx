import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import styles from './ConversationFooter.scss';
import nameof from 'ts-nameof.macro';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import FooterReply from './components/FooterReply';
import {
  Dimensions,
  Platform,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import TextLib from '../atoms/TextLib';
import TruesightChat, {
  ConversationMessage,
} from 'react-native-truesight-chat';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const PLATFORM_IS_ANDROID: boolean = Platform.OS === 'android';
const PLATFORM_IS_IOS: boolean = Platform.OS === 'ios';

export function ConversationFooter(
  props: PropsWithChildren<ConversationFooterProps>
): ReactElement {
  const {
    value,
    onSend,
    onImage,
    onDocument,
    onEmoticons,
    reply,
    inputStyle,
    onReply,
    style,
    footer,
    onPressIn,
    ...resProps
  } = props;
  const { atomicStyles } = TruesightChat;
  const scrollPosition = useSharedValue(0);

  const springStyles = useAnimatedStyle(() => {
    return {
      width: SCREEN_WIDTH - (180 - scrollPosition.value),
      transform: [
        {
          translateX: withSpring(-scrollPosition.value, {
            damping: 50,
            stiffness: 300,
          }),
        },
      ],
    };
  });

  const springButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(scrollPosition.value, {
            damping: 50,
            stiffness: 300,
          }),
        },
      ],
    };
  });

  const handleSend = React.useCallback(() => {
    if (typeof onSend === 'function' && value && value !== '') {
      onSend(value);
    }
  }, [onSend, value]);

  return (
    <>
      <View style={[styles.container, reply && styles.border, style]}>
        {reply && (
          <FooterReply conversationMessage={reply} onCancel={onReply} />
        )}
        <View style={styles.footer}>
          <Animated.View style={[styles.height, springButtonStyles]}>
            <TouchableOpacity onPress={onImage}>
              <SvgIcon component={require('../../../assets/icons/media.svg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDocument}>
              <SvgIcon component={require('../../../assets/icons/file.svg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onEmoticons}>
              <SvgIcon component={require('../../../assets/icons/icon.svg')} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.bg, inputStyle, springStyles]}>
            <View style={styles.input}>
              <TextLib
                style={[
                  styles.inputStyle,
                  PLATFORM_IS_IOS && atomicStyles.mb4,
                  PLATFORM_IS_ANDROID && atomicStyles.mb2,
                  atomicStyles.regular,
                ]}
                // @ts-ignore
                placeholder={'Aa'}
                value={value}
                multiline
                onPressIn={(e) => {
                  if (onPressIn) {
                    onPressIn(e);
                  }
                  scrollPosition.value = 108;
                }}
                onBlur={() => {
                  scrollPosition.value = 0;
                }}
                {...resProps}
              />
            </View>
          </Animated.View>

          <Animated.View style={[springStyles]}>
            <TouchableOpacity style={[styles.button]} onPress={handleSend}>
              <SvgIcon component={require('../../../assets/icons/send.svg')} />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View>{footer}</View>
      </View>
    </>
  );
}

export interface ConversationFooterProps {
  value?: string;

  onSend?: (value: string) => void;

  onImage?: () => void;

  onDocument?: () => void;

  onEmoticons?: () => void;

  onReply?: () => void;

  replyComponent?: ReactElement;

  reply?: ConversationMessage;

  inputStyle?: StyleProp<ViewStyle>;

  style?: StyleProp<ViewStyle>;

  footer?: ReactElement;

  onPressIn?: any;
}

ConversationFooter.defaultProps = {
  //
};

ConversationFooter.displayName = nameof(ConversationFooter);

export default ConversationFooter;
