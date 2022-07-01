import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { SvgComponent } from 'react-native-svg-types';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import TruesightChat, {
  TruesightThemeExtension,
} from 'react-native-truesight-chat';
import SvgIcon from '../atoms/SvgIcon/SvgIcon';
import TextLib from '../atoms/TextLib';
import { useThemeValue } from 'react-native-redux-theming';

export function DetailItemView(
  props: PropsWithChildren<DetailItemViewProps>
): ReactElement {
  const {
    title,
    label,
    icon,
    onPress,
    style,
    titleStyle,
    labelStyle,
    containerStyle,
    rightComponent,
  } = props;
  const { atomicStyles } = TruesightChat;
  const messageTextSecondaryColor = useThemeValue<TruesightThemeExtension>(
    // @ts-ignore
    'messageTextSecondaryColor'
  );

  return (
    <View style={style}>
      {title && (
        <TextLib
          style={[
            atomicStyles.h6,
            atomicStyles.semibold,
            atomicStyles.my3,
            { color: messageTextSecondaryColor },
            titleStyle,
          ]}
        >
          {title}
        </TextLib>
      )}
      <TouchableOpacity
        style={[atomicStyles.flexRowBetween, containerStyle]}
        onPress={onPress}
      >
        <View style={[atomicStyles.flexRowStart]}>
          <SvgIcon component={icon} />
          <TextLib style={[atomicStyles.my2, atomicStyles.ml4, labelStyle]}>
            {label}
          </TextLib>
        </View>
        {rightComponent ? (
          rightComponent
        ) : (
          <SvgIcon component={require('../../../assets/icons/right.svg')} />
        )}
      </TouchableOpacity>
    </View>
  );
}

export interface DetailItemViewProps {
  title?: string;

  label: string;

  icon: { default: SvgComponent };

  onPress?: () => void;

  style?: StyleProp<ViewStyle>;

  titleStyle?: StyleProp<TextStyle>;

  labelStyle?: StyleProp<TextStyle>;

  containerStyle?: StyleProp<ViewStyle>;

  rightComponent?: ReactElement;
}

DetailItemView.defaultProps = {
  //
};

DetailItemView.displayName = nameof(DetailItemView);

export default DetailItemView;
