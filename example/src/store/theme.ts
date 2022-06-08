import { createThemeSlice } from 'react-native-redux-theming';
import type { ThemeStyle } from 'src/types/Theme';

export const themeSlice = createThemeSlice<ThemeStyle>({
  currentTheme: 'default',
  themes: {
    default: {
      primaryColor: '#0F62FE',
      secondaryColor: '#FAF9F8',
      whiteColor: '#FFFFFF',
      blackColor: '#434343',
      dangerColor: '#D82C0D',
      successColor: '#00B391',
      warningColor: '#FFC515',
      grayColor: '#161616',
      hoverColor: '#F5F5F5',
      primaryTextColor: '#4C4C4C',
      secondaryTextColor: '#9D9D9D',
      borderColor: '#6F6F6F',

      infoColor: '#FFFFFF',
      lightColor: '#FFFFFF',
      darkColor: '#161616',
      mutedColor: '#FFFFFF',
    },
  },
});
