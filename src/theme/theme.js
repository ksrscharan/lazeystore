import { createTheme } from '@mantine/core';

export const lightTheme = createTheme({
    colorScheme: 'light',
    primaryColor: 'orange',
    white: '#f3fdea',
    black: '#171e10',
    colors: {
        green: ['#80986f']
    }

});

export const darkTheme = createTheme({
    colorScheme: 'dark',
    primaryColor: 'orange',
    black: '#f3fdea',
    white: '#171e10',
    colors: {
        green: ['#80986f']
    }

});