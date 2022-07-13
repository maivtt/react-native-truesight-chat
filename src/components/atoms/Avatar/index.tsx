import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { Image, StyleProp, View, ViewStyle } from 'react-native';
import { avatarStyles } from './Avatar.styles';
import TruesightChat, {
  TruesightThemeExtension,
} from 'react-native-truesight-chat';
import { useThemeValue } from 'react-native-redux-theming';

export function Avatar(props: PropsWithChildren<AvatarProps>): ReactElement {
  const { avatarSource, avatarRadius, avatarStyle } = props;
  const { atomicStyles } = TruesightChat;

  const messageBackgroundOtherColor = useThemeValue<TruesightThemeExtension>(
    'messageBackgroundOtherColor'
  );

  return (
    <>
      <View
        style={[
          {
            height: avatarRadius,
            width: avatarRadius,
            backgroundColor: messageBackgroundOtherColor,
          },
          avatarStyles.border,
          avatarStyle,
        ]}
      >
        <Image
          style={[atomicStyles.w100, atomicStyles.h100, avatarStyles.border]}
          source={
            avatarSource
              ? { uri: TruesightChat.serverUrl + avatarSource }
              : require('../../../../assets/images/default-avatar.png')
          }
        />
      </View>
    </>
  );
}

export interface AvatarProps {
  avatarRadius?: number;

  avatarSource?: string;

  avatarStyle?: StyleProp<ViewStyle>;
}

Avatar.defaultProps = {
  avatarRadius: 40,
};

Avatar.displayName = nameof(Avatar);

export default Avatar;
