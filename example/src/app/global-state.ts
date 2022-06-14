import React from 'reactn';
import { appStorage } from './app-storage';

export class GlobalState {
  /**
   * Initialize app global state
   */
  public async initialize() {
    await React.setGlobal<GlobalState>({
      language: await appStorage.language,
    });
  }

  public get language(): string {
    return React.getGlobal<GlobalState>().language;
  }

  public get token(): string {
    return React.getGlobal<GlobalState>().token;
  }

  public async setToken(token: string) {
    await React.setGlobal<GlobalState>({
      token,
    });
  }

  public get refreshToken(): string {
    return React.getGlobal<GlobalState>().refreshToken;
  }

  public async setRefreshToken(refreshToken: string) {
    await React.setGlobal<GlobalState>({
      refreshToken,
    });
  }
}

export const globalState: GlobalState = new GlobalState();
