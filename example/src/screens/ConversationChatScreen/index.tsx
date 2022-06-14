import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationChatScreenParams } from './ConversationChatScreenParams';
import ConversationMessageFlatList from '../../../../src/components/ConversationMessageFlatList';
import { GLOBAL_USER } from '../../app';

export function ConversationChatScreen(
  props: PropsWithChildren<ConversationChatScreenProps>
): ReactElement {
  const { route } = props;
  const { conversation } = route.params;

  return (
    <>
      <ConversationMessageFlatList
        conversation={conversation}
        globalUser={GLOBAL_USER}
      />
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
