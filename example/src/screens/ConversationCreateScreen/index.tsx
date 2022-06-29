import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { View } from 'react-native';
import { ConversationCreateLayout } from 'react-native-truesight-chat';
import { GLOBAL_USER } from '../../app';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationCreateGroupScreen } from '../index';

export function ConversationCreateScreen(
  props: PropsWithChildren<ConversationCreateScreenProps>
): ReactElement {
  const { navigation } = props;

  return (
    <View style={[{ flex: 1, backgroundColor: '#FFF' }]}>
      <ConversationCreateLayout
        currentGlobalUser={GLOBAL_USER}
        leftSearchComponent={'Đến: '}
        suggestLabel={'Gợi ý'}
        createGroupButtonVisible={true}
        createGroupButtonLabel={'Tạo nhóm mới'}
        onCreateGroupButtonPress={() => {
          navigation.navigate(ConversationCreateGroupScreen.displayName!);
        }}
      />
    </View>
  );
}

export interface ConversationCreateScreenProps
  extends NativeStackScreenProps<any> {
  //
}

ConversationCreateScreen.defaultProps = {
  //
};

ConversationCreateScreen.displayName = nameof(ConversationCreateScreen);

export default ConversationCreateScreen;
