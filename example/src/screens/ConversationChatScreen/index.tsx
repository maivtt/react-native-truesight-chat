import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationChatScreenParams } from './ConversationChatScreenParams';
import { GLOBAL_USER } from '../../app';
import { ConversationChat } from 'react-native-truesight-chat';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { newMessageSelector } from '../../selectors';
import { conversationSlice } from '../../store/conversation';
import store from '../../store';
import { DetailScreen } from '../index';

export function ConversationChatScreen(
  props: PropsWithChildren<ConversationChatScreenProps>
): ReactElement {
  const { navigation, route } = props;
  const { conversation } = route.params;
  const { bottom } = useSafeAreaInsets();

  const newMessage = useSelector(newMessageSelector);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[{ marginRight: 8, padding: 8, backgroundColor: 'coral' }]}
        onPress={() => {
          navigation.navigate(DetailScreen.displayName!, {
            conversation: conversation,
          });
        }}
      >
        <Text>GoTo Detail Conversation</Text>
      </TouchableOpacity>
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
