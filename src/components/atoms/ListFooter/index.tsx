import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Lang } from '../../../lang';
import { useThemeValue } from 'react-native-redux-theming';
import { useTranslation } from 'react-i18next';
import TruesightChat from 'react-native-truesight-chat';

export function ListFooter(
  props: PropsWithChildren<ListFooterProps>
): ReactElement {
  const { check, isData, isEnd, style } = props;
  const [translate] = useTranslation();
  const darkColor = useThemeValue('darkColor');
  const { atomicStyles } = TruesightChat;

  return (
    <>
      <View style={style}>
        {isData && (
          <>
            {check ? (
              <View style={[atomicStyles.alignItemsCenter, atomicStyles.mt4]}>
                <ActivityIndicator color={darkColor} />
              </View>
            ) : (
              isEnd && (
                <View style={[atomicStyles.alignItemsCenter, atomicStyles.mt1]}>
                  <Text>{translate(Lang.Error.ListEnd)}</Text>
                </View>
              )
            )}
          </>
        )}
      </View>
    </>
  );
}

export interface ListFooterProps {
  check: boolean;

  isData: boolean;

  isEnd?: boolean;

  style?: StyleProp<ViewStyle>;
}

ListFooter.defaultProps = {
  //
};

ListFooter.displayName = nameof(ListFooter);

export default ListFooter;
