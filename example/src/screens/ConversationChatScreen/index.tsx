import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ConversationChatScreenParams } from './ConversationChatScreenParams';
import ConversationMessageFlatList from '../../../../src/components/ConversationMessageFlatList';
import { GLOBAL_USER } from '../../app';
import {
  AnimatedPicker,
  AttachmentType,
  ConversationFooter,
} from 'react-native-truesight-chat';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ConversationChatScreen(
  props: PropsWithChildren<ConversationChatScreenProps>
): ReactElement {
  const { route } = props;
  const { conversation } = route.params;
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <ConversationMessageFlatList
        conversation={conversation}
        globalUser={GLOBAL_USER}
        style={[{ margin: 16 }]}
      />

      <ConversationFooter
        value={'Heell'}
        onSend={() => {}}
        onImage={() => {}}
        onDocument={() => {}}
        onEmoticons={() => {}}
        onPressIn={() => {}}
        reply={undefined}
        onReply={() => {}}
        style={[{ marginBottom: bottom }]}
        footer={
          <AnimatedPicker
            type={AttachmentType.None}
            onCancel={() => {}}
            endingPickImageHandle={() => {}}
            images={[]}
          />
        }
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
