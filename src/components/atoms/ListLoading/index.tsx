import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { LoadingStatus } from '../../../hooks/use-list';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeValue } from 'react-native-redux-theming';
import { Lang } from '../../../lang';
import TruesightChat from 'react-native-truesight-chat';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

export function ListLoading(
  props: PropsWithChildren<ListLoadingProps>
): ReactElement {
  const { loading } = props;
  const [translate] = useTranslation();
  const darkColor = useThemeValue('darkColor');
  const primaryColor = useThemeValue('primaryColor');
  const { atomicStyles } = TruesightChat;

  return (
    <>
      {loading === LoadingStatus.INIT && (
        <View style={[atomicStyles.alignItemsCenter, atomicStyles.mt4]}>
          <ActivityIndicator color={darkColor} />
        </View>
      )}
      {loading === LoadingStatus.PROGRESSING && (
        <View
          style={[
            atomicStyles.alignItemsCenter,
            { marginTop: SCREEN_HEIGHT / 4 },
          ]}
        >
          <ActivityIndicator color={primaryColor} />
        </View>
      )}
      {loading === LoadingStatus.SUCCESS && (
        <View
          style={[
            atomicStyles.alignItemsCenter,
            { marginTop: SCREEN_HEIGHT / 4 },
          ]}
        >
          <Text>{translate(Lang.Error.ListEmpty)}</Text>
        </View>
      )}
      {loading === LoadingStatus.FAIL && (
        <View
          style={[
            atomicStyles.alignItemsCenter,
            { marginTop: SCREEN_HEIGHT / 4 },
          ]}
        >
          <Text>{translate(Lang.Error.ListError)}</Text>
        </View>
      )}
    </>
  );
}

export interface ListLoadingProps {
  loading: LoadingStatus;

  error?: string;
}

ListLoading.defaultProps = {
  //
};

ListLoading.displayName = nameof(ListLoading);

export default ListLoading;
