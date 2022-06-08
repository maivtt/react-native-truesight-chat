import { translate } from 'react3l-localization';

export enum AppLanguage {
  ENGLISH = 'en',
  VIETNAMESE = 'vi',
}

export const AppLanguageDisplay = {
  [AppLanguage.VIETNAMESE]: translate('language.vietnamese'),
  [AppLanguage.ENGLISH]: translate('language.english'),
};
