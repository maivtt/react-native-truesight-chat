import React from 'reactn';
import type {AppLanguage} from 'src/types/AppLanguage';
import {appStorage} from 'src/app/app-storage';

export class GlobalState {
  /**
   * Initialize app global state
   */
  public async initialize() {
    await React.setGlobal<GlobalState>({
      language: await appStorage.language,
    });
  }

  public get language(): AppLanguage {
    return React.getGlobal<GlobalState>().language;
  }

  public get timeout(): Date | undefined {
    return React.getGlobal<GlobalState>().timeout;
  }

  /**
   * Update timeout
   *
   * @param timeout {Date}
   */
  public async setTimeout(timeout: Date | undefined) {
    await React.setGlobal<GlobalState>({
      timeout,
    });
  }
}

export const globalState: GlobalState = new GlobalState();
