import './index.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

// import { createTheme, MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from './redux/store.js';

// const theme = createTheme({
//   breakpoints: {
//     xs: '320px',
//     sm: '640px',
//     md: '768px',
//     lg: '1024px',
//     xl: '1280px',
//   },
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
