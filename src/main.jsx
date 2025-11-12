import './index.css';
import '@mantine/core/styles.css';

import { createRoot } from 'react-dom/client';

import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
