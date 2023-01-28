import {
  DefaultTheme,
  DarkTheme as DarkThemeObj,
} from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
  },
};
export const DarkTheme = {
  ...DarkThemeObj,
  colors: {
    ...DarkThemeObj.colors,
    primary: 'white',
  },
};
