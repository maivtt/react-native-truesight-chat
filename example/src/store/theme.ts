import { createThemeSlice } from 'react-native-redux-theming';
import type { TruesightThemeExtension } from 'react-native-truesight-chat';

export const themeSlice = createThemeSlice<TruesightThemeExtension>({
  currentTheme: 'default',
  themes: {
    default: {
      primaryColor: '#0F62FE',
      secondaryColor: '#FAF9F8',
      dangerColor: '#D82C0D',
      successColor: '#00B391',
      warningColor: '#FFC515',
      infoColor: '#FFFFFF',
      lightColor: '#FFFFFF',
      darkColor: '#161616',
      mutedColor: '#FFFFFF',
      messageBackgroundColor: '#E0EBFF',
      messageBackgroundOtherColor: '#e6e6e5',
      messageTextPrimaryColor: '#3B3A39',
      messageTextSecondaryColor: '#9D9D9D',
    },
  },
});
