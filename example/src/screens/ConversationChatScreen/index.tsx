import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationChatScreenParams } from './ConversationChatScreenParams';
import { GLOBAL_USER } from '../../app';
import { ConversationChat } from 'react-native-truesight-chat';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
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

  const newMessage = useSelector(newMessageSelector);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[{ padding: 8, backgroundColor: 'coral' }]}
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
        style={[{ marginBottom: -100 }]}
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
