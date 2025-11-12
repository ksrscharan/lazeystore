import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Deals from './pages/deals/Deals'
import Dashboard from './pages/dashboard/Dashboard'
import SignUp from './pages/signup/SignUp'
import WishList from './pages/wishlist/WishList'
import { MantineProvider } from '@mantine/core'
import { lightTheme, darkTheme } from './theme/theme.js'
import { useSelector } from 'react-redux'


function App() {

const mode = useSelector((state) => state.theme.mode);
  return (
    <>
      <MantineProvider theme={mode == 'light' ? lightTheme : darkTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/deals" element={<Deals />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>


    </>
  )
}

export default App


