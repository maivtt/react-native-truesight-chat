import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import { Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationChatScreenParams } from './ConversationChatScreenParams';

export function ConversationChatScreen(
  props: PropsWithChildren<ConversationChatScreenProps>
): ReactElement {
  const { route } = props;
  const {} = route.params;

  return (
    <>
      <View>
        <Text>{}</Text>
      </View>
    </>
  );
}

export interface ConversationChatScreenProps
  extends NativeStackScreenProps<Record<string, ConversationChatScreenParams>> {
  //
}

ConversationChatScreen.defaultProps = {
  //
};

ConversationChatScreen.displayName = nameof(ConversationChatScreen);

export default ConversationChatScreen;
