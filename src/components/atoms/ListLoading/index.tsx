import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { LoadingStatus } from '../../../hooks/use-list';
import { ActivityIndicator, Dimensions, Text, View } from 'react-native';
import { useThemeValue } from 'react-native-redux-theming';
import TruesightChat from 'react-native-truesight-chat';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

export function ListLoading(
  props: PropsWithChildren<ListLoadingProps>
): ReactElement {
  const { loading, listEmpty, listError } = props;
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
          <Text>{listEmpty ?? ''}</Text>
        </View>
      )}
      {loading === LoadingStatus.FAIL && (
        <View
          style={[
            atomicStyles.alignItemsCenter,
            { marginTop: SCREEN_HEIGHT / 4 },
          ]}
        >
          <Text>{listError ?? ''}</Text>
        </View>
      )}
    </>
  );
}

export interface ListLoadingProps {
  loading: LoadingStatus;

  error?: string;

  listEmpty?: string; //Show no data when get list

  listError?: string; //Show error when get list
}

ListLoading.defaultProps = {
  //
};

ListLoading.displayName = nameof(ListLoading);

export default ListLoading;
