import type { PropsWithChildren, ReactElement } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import { ConversationFlatList } from 'react-native-truesight-chat';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ConversationChatScreen,
  ConversationCreateGroupScreen,
  ConversationCreateScreen,
} from '../index';
import { Text, TouchableOpacity, View } from 'react-native';
import { GLOBAL_USER } from '../../app';

export function ConversationListScreen(
  props: PropsWithChildren<ConversationListScreenProps>
): ReactElement {
  const { navigation } = props;

  return (
    <>
      <View style={[{ flexDirection: 'row' }]}>
        <TouchableOpacity
          style={[{ marginRight: 8, padding: 8, backgroundColor: 'coral' }]}
          onPress={() => {
            navigation.navigate(ConversationCreateScreen.displayName!);
          }}
        >
          <Text>Create Single Conversation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              padding: 8,
              backgroundColor: 'darkseagreen',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            navigation.navigate(ConversationCreateGroupScreen.displayName!);
          }}
        >
          <Text>Create Group Conversation</Text>
        </TouchableOpacity>
      </View>
      <ConversationFlatList
        navigation={navigation}
        globalUser={GLOBAL_USER}
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
