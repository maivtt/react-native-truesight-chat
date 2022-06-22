import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { Text, TextProps } from 'react-native';
import { useThemeValue } from 'react-native-redux-theming';
import type { TruesightThemeExtension } from 'react-native-truesight-chat';
import atomicStyles from '../../../styles';

export function TextLib(props: PropsWithChildren<TextLibProps>): ReactElement {
  const { children, style, ...resProps } = props;

  const messageTextPrimaryColor = useThemeValue<TruesightThemeExtension>(
    // @ts-ignore
    'messageTextPrimaryColor'
  );

  return (
    <Text
      style={[
        { color: messageTextPrimaryColor as string },
        atomicStyles.sub2,
        atomicStyles.text,
        style,
      ]}
      {...resProps}
    >
      {children}
    </Text>
  );
}

export interface TextLibProps extends TextProps {
  //
}

TextLib.defaultProps = {
  //
};

TextLib.displayName = nameof(TextLib);

export default TextLib;