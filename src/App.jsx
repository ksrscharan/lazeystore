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
            <Route path="/" element={<Dashboard />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wishlist" element={<WishList />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
