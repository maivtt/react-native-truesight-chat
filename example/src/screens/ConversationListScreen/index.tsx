import React from 'react';
import type { PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import {
  Conversation,
  ConversationFlatList,
} from 'react-native-truesight-chat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConversationChatScreen } from '../index';

export function ConversationListScreen(
  props: PropsWithChildren<ConversationListScreenProps>
): ReactElement {
  const { navigation } = props;

  const handleGoToDetail = React.useCallback(
    (conversation: Conversation) => {
      navigation.navigate(ConversationChatScreen.displayName!, {
        conversation: conversation,
      });
    },
    [navigation]
  );

  return (
    <>
      <ConversationFlatList onPress={handleGoToDetail} />
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
