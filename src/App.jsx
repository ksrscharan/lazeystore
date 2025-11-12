import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useSelector } from 'react-redux'

import './App.css'
import { lightTheme, darkTheme } from './theme/theme.js'

import Dashboard from './pages/dashboard/Dashboard'
import Deals from './pages/deals/Deals'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import WishList from './pages/wishlist/WishList'


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
  )
}

export default App


