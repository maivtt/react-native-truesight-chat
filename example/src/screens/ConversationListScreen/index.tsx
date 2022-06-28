import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { ConversationFlatList } from 'react-native-truesight-chat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationChatScreen } from '../index';

export function ConversationListScreen(
  props: PropsWithChildren<ConversationListScreenProps>
): ReactElement {
  const { navigation } = props;

  return (
    <>
      <ConversationFlatList
        navigation={navigation}
        target={ConversationChatScreen.displayName!}
      />
    </>
  );
}

export interface ConversationListScreenProps
  extends NativeStackScreenProps<any> {
  //
}

ConversationListScreen.defaultProps = {
  //
};

ConversationListScreen.displayName = nameof(ConversationListScreen);

export default ConversationListScreen;
