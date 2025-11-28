import { createTheme } from '@mantine/core';

const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

const lightTheme = createTheme({
  fontFamily: 'Hammersmith One, Courier New, Courier, monospace',
  black: '#171e10',
  colors: {
    green: ['#80986f'],
  },
  colorScheme: 'light',
  primaryColor: 'orange',
  white: '#f3fdea',
  breakpoints,
});

const darkTheme = createTheme({
  fontFamily: 'Hammersmith One, Courier New, Courier, monospace',
  black: '#f3fdea',
  colors: {
    green: ['#80986f'],
  },
  colorScheme: 'dark',
  primaryColor: 'orange',
  white: '#171e10',
  breakpoints,
});
export { darkTheme, lightTheme };
