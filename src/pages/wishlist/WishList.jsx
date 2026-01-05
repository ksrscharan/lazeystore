import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Flex } from '@mantine/core'

import Navbar from '../../components/navbar/Navbar'
import WishlistProductList from '../../components/productsList/WishlistProductList'
import { getNewAccessToken } from '../../redux/thunk/account'
import { getUser } from '../../redux/thunk/userProduct'

function WishList() {
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
    <Box h={'100vh'} w={'100vw'}>
      <Navbar />
      <Flex align={'center'} m={'auto'} direction={'column'} h={'80vh'} w={'80%'}>
        <WishlistProductList products={user?.data?.wishlist} navigate={navigate} />
      </Flex>
    </Box>
  )
}

export default WishList