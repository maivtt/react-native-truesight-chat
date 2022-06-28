import { HubConnectionState } from '@microsoft/signalr';
import type { SignalService } from './index';
import type { Conversation } from 'react-native-truesight-chat';

const METHOD_NAME: string = 'SendMessage';

export async function send(
  this: SignalService,
  conversation: Conversation,
  user: any,
  message: string
) {
  if (
    this.hubConnection &&
    this.hubConnection?.state === HubConnectionState.Connected
  ) {
    try {
      await this.hubConnection.send(
        METHOD_NAME,
        conversation?.id!.toString(),
        user?.id!.toString(),
        'CREATE',
        '0',
        JSON.stringify(message)
      );
    } catch (error: any) {
      console.log(error);
    }
  }
}
