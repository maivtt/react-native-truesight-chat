import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { Image, StyleProp, View, ViewStyle } from 'react-native';
import atomicStyles from '../../../styles';
import { avatarStyles } from './Avatar.styles';

export function Avatar(props: PropsWithChildren<AvatarProps>): ReactElement {
  const { source, radius, style } = props;

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
