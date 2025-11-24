import './index.css';
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './redux/store.js';

const theme = createTheme({
  breakpoints: {
    lg: '64em',
    md: '48em',
    sm: '40em',
    xl: '80em',
    xs: '20em',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
