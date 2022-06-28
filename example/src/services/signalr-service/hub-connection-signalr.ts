import * as signalR from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr';
import buildUrl from 'build-url';
import { conversationSlice } from '../../store/conversation';
import type { SignalService } from './index';
import { server } from '../../config/server';
import { ConversationEndpoints } from '../../config/endpoints';
import store from '../../store';
import { globalState } from '../../app';
import { ConversationMessage } from 'react-native-truesight-chat';

const METHOD_NAME: string = 'ReceiveMessage';

export async function hubConnectionSignalr(this: SignalService) {
  const hub = new signalR.HubConnectionBuilder()
    .withUrl(
      buildUrl(server.serverUrl, {
        path: ConversationEndpoints.SIGNALR_HREF,
      }),
      {
        accessTokenFactory: () => globalState.token!,
      }
    )
    .configureLogging(signalR.LogLevel.Warning)
    .build();

  if (this.hubConnection) {
    await this.close();
  }

  if (hub) {
    this.hubConnection = hub;
    await this.hubConnection.start();

    if (this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.on(
        METHOD_NAME,
        async (conversationId, action, message) => {
          const newMessage = JSON.parse(message);
          const conversationMessage = Object.assign<ConversationMessage, any>(
            new ConversationMessage(),
            newMessage
          );
          console.log(conversationId, action, conversationMessage);
          store.dispatch(
            conversationSlice.actions.setMessage(conversationMessage)
          );
        }
      );
    }
  }
}
