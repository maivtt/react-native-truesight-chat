import 'react-native-gesture-handler';
import type { ReactElement } from 'react';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { AppRegistry } from 'react-native';
import { name as appName } from '../app.json';
import TruesightChat from 'react-native-truesight-chat';
import { conversationRepository } from './repositories/conversation-repository';
import atomicStyles from './styles';
import { portalRepository } from './repositories/portal-repository';
import { globalState } from './app';
import RootNavigator from './navigators/RootNavigator';
import store from './store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { conversationMessageRepository } from './repositories/conversation-message-repository';
import { server } from './config/server';

enableScreens();

TruesightChat.config({
  serverUrl: server.serverUrl,
  atomicStyles: atomicStyles,
  listConversation: conversationRepository.list,
  countConversation: conversationRepository.count,
  listConversationMessage: conversationMessageRepository.list,
  countConversationMessage: conversationMessageRepository.count,
});

export default function App(): ReactElement {
  React.useEffect(() => {
    TruesightChat.listConversation({}).subscribe();
    portalRepository.login().subscribe({
      next: async (value) => {
        await globalState.setToken(value.token);
        await globalState.setRefreshToken(value.refreshToken);
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
