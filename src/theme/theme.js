import { createTheme } from '@mantine/core';
import { Input } from 'postcss';

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
  components: {
    Input: {
      styles: {
        input: {
          border: '1px solid var(--mantine-color-green-0)',
          backgroundColor: 'transparent',
          '&:focus-within': {
            outline: '2px solid var(--mantine-color-blue-5)',
            borderColor: 'var(--mantine-color-black)',
          },
        },
      },

    }
  }
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
  components: {
    Input: {
      styles: {
        input: {
          border: '1px solid var(--mantine-color-green-0)',
          backgroundColor: 'transparent',
          '&:focus-within': {
            outline: '2px solid var(--mantine-color-blue-5)',
            borderColor: 'var(--mantine-color-black)',
          },
        },
      },

    }
  }
});
export { darkTheme, lightTheme };
