import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { Image, StyleProp, View, ViewStyle } from 'react-native';
import { avatarStyles } from './Avatar.styles';
import TruesightChat from 'react-native-truesight-chat';

export function Avatar(props: PropsWithChildren<AvatarProps>): ReactElement {
  const { source, radius, style } = props;
  const { atomicStyles } = TruesightChat;

  return (
    <>
      <View style={[{ height: radius, width: radius }, style]}>
        <Image
          style={[atomicStyles.w100, atomicStyles.h100, avatarStyles.border]}
          source={
            source
              ? { uri: source }
              : require('../../../../assets/images/default-avatar.png')
          }
          defaultSource={require('../../../../assets/images/default-avatar.png')}
        />
      </View>
    </>
  );
}

export interface AvatarProps {
  radius: number;

  source?: string;

  style?: StyleProp<ViewStyle>;
}

Avatar.defaultProps = {
  //
};

Avatar.displayName = nameof(Avatar);

export default Avatar;
