import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationChatScreenParams } from './ConversationChatScreenParams';
import { GLOBAL_USER } from '../../app';
import { ConversationChat } from 'react-native-truesight-chat';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { newMessageSelector } from '../../selectors';
import { conversationSlice } from '../../store/conversation';
import store from '../../store';

export function ConversationChatScreen(
  props: PropsWithChildren<ConversationChatScreenProps>
): ReactElement {
  const { navigation, route } = props;
  const { conversation } = route.params;
  const { bottom } = useSafeAreaInsets();

  const newMessage = useSelector(newMessageSelector);

  return (
    <SafeAreaView>
      <ConversationChat
        navigation={navigation}
        conversation={conversation}
        globalUser={GLOBAL_USER}
        conversationFooterStyle={[{ bottom: bottom }]}
        newMessage={newMessage}
        onRemoveMessage={() => {
          store.dispatch(conversationSlice.actions.removeMessage());
        }}
      />
    </SafeAreaView>
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
