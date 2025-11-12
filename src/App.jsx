import './App.css';

import { useSelector } from 'react-redux';

import { darkTheme, lightTheme } from './theme/theme.js';

function App() {
  const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <MantineProvider theme={mode == 'light' ? lightTheme : darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Deals />} path="/deals" />
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<WishList />} path="/wishlist" />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
