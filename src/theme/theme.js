import { createTheme } from '@mantine/core';

const lightTheme = createTheme({
  black: '#171e10',
  colors: {
    green: ['#80986f'],
  },
  colorScheme: 'light',
  primaryColor: 'orange',
  white: '#f3fdea',
});

const darkTheme = createTheme({
  black: '#f3fdea',
  colors: {
    green: ['#80986f'],
  },
  colorScheme: 'dark',
  primaryColor: 'orange',
  white: '#171e10',
});
export { darkTheme, lightTheme };
