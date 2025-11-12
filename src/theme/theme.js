import { createTheme } from '@mantine/core';

const lightTheme = createTheme({
  colorScheme: 'light',
  primaryColor: 'orange',
  white: '#f3fdea',
  black: '#171e10',
  colors: {
    green: ['#80986f'],
  },
});

const darkTheme = createTheme({
  colorScheme: 'dark',
  primaryColor: 'orange',
  black: '#f3fdea',
  white: '#171e10',
  colors: {
    green: ['#80986f'],
  },
});
export { lightTheme, darkTheme };
