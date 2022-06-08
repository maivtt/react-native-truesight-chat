import 'react-native-gesture-handler';
import type { ReactElement } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { name as appName } from '../app.json';
import TruesightChat from 'react-native-truesight-chat';
import { conversationRepository } from './repositories/conversation-repository';
import atomicStyles from './styles';

enableScreens();

TruesightChat.config({
  listConversation: conversationRepository.list,
  atomicStyles,
});

export default function App(): ReactElement {
  React.useEffect(() => {
    TruesightChat.listConversation({}).subscribe();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>123</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

AppRegistry.registerComponent(appName, () => App);
