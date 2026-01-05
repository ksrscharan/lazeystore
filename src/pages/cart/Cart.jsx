import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Flex } from '@mantine/core'

import Navbar from '../../components/navbar/Navbar'
import { getNewAccessToken } from '../../redux/thunk/account'
import { getUser } from '../../redux/thunk/userProduct'
import CartProductList from '../../components/productsList/CartProductList'

function Cart() {
  const user = useSelector(state => state.userDetails.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.accessToken.token)
  useEffect(() => {
    getNewAccessToken(dispatch)
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(getUser())
    }
  }, [token])
  return (
    <>
      <Navbar />
      <Flex direction={'column'}>
        <CartProductList products={user?.data?.cart} navigate={navigate} />
      </Flex>
    </>
  )
}

export default Cart