import './App.css';

import { MantineProvider } from '@mantine/core';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard.jsx';
import Deals from './pages/deals/Deals.jsx';
import Login from './pages/login/Login.jsx';
import SignUp from './pages/signup/SignUp.jsx';
import WishList from './pages/wishlist/WishList.jsx';
import { darkTheme, lightTheme } from './theme/theme.js';
import ProductDetails from './pages/productDetails/ProductDetails.jsx';

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
            <Route element={<ProductDetails/>} path="/product/:id" />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
