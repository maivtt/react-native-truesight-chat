import type { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr';
import { hubConnectionSignalr } from './hub-connection-signalr';
import { send } from './send';
import type { AppStateStatus } from 'react-native';
import { globalState } from '../../app';

export class SignalService {
  protected hubConnection: HubConnection | null = null;

  protected wifiConnected: boolean = true;

  public readonly hubConnectionSignalr = hubConnectionSignalr;

  public readonly send = send;

  public readonly hubSyncConnection = () => {
    return this.hubConnection;
  };

  public readonly close = async () => {
    if (
      this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Connected
    ) {
      await this.hubConnection.stop().then(() => {
        this.hubConnection = null;
        console.log('signalr stopped');
      });
      return;
    }
    if (
      this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Disconnected
    ) {
      this.hubConnection = null;
      console.log('signalr stopped');
    }
  };

  public readonly handleAppState = async (state: AppStateStatus) => {
    switch (state) {
      case 'active':
        const token = globalState.token!;
        if (token && !this.hubConnection) {
          await this.hubConnectionSignalr();
        }
        break;
      case 'background':
        await this.close();
        break;
    }
  };
}

export const signalService: SignalService = new SignalService();
