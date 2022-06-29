import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { View } from 'react-native';
import { ConversationCreateLayout } from 'react-native-truesight-chat';
import { GLOBAL_USER } from '../../app';
import atomicStyles from 'react-native-atomic-styles/src/styles.scss';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export function ConversationCreateGroupScreen(
  props: PropsWithChildren<ConversationCreateGroupScreenProps>
): ReactElement {
  const {} = props;

  return (
    <View style={[{ flex: 1, backgroundColor: '#FFF' }]}>
      <ConversationCreateLayout
        currentGlobalUser={GLOBAL_USER}
        leftSearchComponent={
          <View
            style={[
              atomicStyles.mr4,
              { backgroundColor: 'green', width: 16, height: 16 },
            ]}
          />
        }
        multiSelect={true}
        listSelect={[]}
        placeholder={'Tim kiem'}
        suggestLabel={'Gợi ý'}
      />
    </View>
  );
}

export interface ConversationCreateGroupScreenProps
  extends NativeStackScreenProps<any> {
  //
}

ConversationCreateGroupScreen.defaultProps = {
  //
};

ConversationCreateGroupScreen.displayName = nameof(
  ConversationCreateGroupScreen
);

export default ConversationCreateGroupScreen;
