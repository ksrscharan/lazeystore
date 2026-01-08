import { createTheme } from '@mantine/core';

const breakpoints = {
  lg: '1024px',
  md: '768px',
  sm: '640px',
  xl: '1280px',
  xs: '320px',
};

const lightTheme = createTheme({
  black: '#171e10',
  breakpoints,
  colors: {
    // green: ['#80986f'],
    // green: ['#6366f1'],
    green: [' #10b981'],
  },
  colorScheme: 'light',
  components: {
    Input: {
      styles: {
        input: {
          '&:focusWithin': {
            borderColor: 'var(--mantine-color-black)',
            outline: '2px solid var(--mantine-color-blue-5)',
          },
          backgroundColor: 'transparent',
          border: '1px solid var(--mantine-color-green-0)',
        },
      },
    },
  },
  fontFamily: 'Hammersmith One, Courier New, Courier, monospace',
  primaryColor: 'orange',
  // white: '#f3fdea',
  white: ' #f8f9fa ', // {Future design choice}
});

const darkTheme = createTheme({
  black: '#f3fdea',
  breakpoints,
  colors: {
    // green: ['#80986f'],
    green: [' #10b981'],
  },
  colorScheme: 'dark',
  components: {
    Input: {
      styles: {
        input: {
          '&:focusWithin': {
            borderColor: 'var(--mantine-color-black)',
            outline: '2px solid var(--mantine-color-blue-5)',
          },
          backgroundColor: 'transparent',
          border: '1px solid var(--mantine-color-green-0)',
        },
      },
    },
  },
  fontFamily: 'Hammersmith One, Courier New, Courier, monospace',
  primaryColor: 'orange',
  // white: '#171e10',
  white: '#0f1117',
});
export { darkTheme, lightTheme };
