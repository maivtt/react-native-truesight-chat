import AsyncStorage from '@react-native-async-storage/async-storage';
import nameof from 'ts-nameof.macro';

export class AppStorage {
  public token?: string | null;

  public refreshToken?: string | null;

  public get language(): Promise<string> {
    return AsyncStorage.getItem(nameof(AppStorage.prototype.language)).then(
      () => {
        return 'vi';
      }
    );
  }

  public async setLanguage(lang: string): Promise<void> {
    await AsyncStorage.setItem(nameof(AppStorage.prototype.language), lang);
  }

  public async setToken(token: string): Promise<void> {
    this.token = token;
    await AsyncStorage.setItem(nameof(this.token), token);
  }

  public async setRefreshToken(refreshToken: string): Promise<void> {
    this.refreshToken = refreshToken;
    await AsyncStorage.setItem(nameof(this.refreshToken), refreshToken);
  }

  /**
   * Initialize
   *
   */

  public async initialize(): Promise<void> {
    this.token = await AsyncStorage.getItem(nameof(this.token));
    this.refreshToken = await AsyncStorage.getItem(nameof(this.refreshToken));
  }
}

export const appStorage: AppStorage = new AppStorage();
