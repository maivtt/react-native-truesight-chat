import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { Text, View } from 'react-native';
import TruesightChat from 'react-native-truesight-chat';

const { atomicStyles } = TruesightChat;

export function ConversationListScreen(
  props: PropsWithChildren<ConversationListScreenProps>
): ReactElement {
  const {} = props;

  return (
    <>
      <View>
        <Text style={[atomicStyles.p4, atomicStyles.text]}>123</Text>
      </View>
    </>
  );
}

export interface ConversationListScreenProps {
  //
}

ConversationListScreen.defaultProps = {
  //
};

ConversationListScreen.displayName = nameof(ConversationListScreen);

export default ConversationListScreen;
