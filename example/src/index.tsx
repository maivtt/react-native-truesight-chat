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

enableScreens();

TruesightChat.config({
  listConversation: conversationRepository.list,
  atomicStyles: atomicStyles,
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

  return <RootNavigator />;
}

AppRegistry.registerComponent(appName, () => App);
