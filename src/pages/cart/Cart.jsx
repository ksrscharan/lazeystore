import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, Text } from '@mantine/core'

import Navbar from '../../components/navbar/Navbar'
import { getNewAccessToken } from '../../redux/thunk/account'
import { getUser } from '../../redux/thunk/userProduct'
import CartProductList from '../../components/productsList/CartProductList'
import { slantLineThrough } from '../../helpers/variables'
import { BasicButton } from '../../components/buttons/Buttons'

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
    <Box h={'100vh'} w={'100vw'}>
      <Navbar />
      <Flex align={'center'} m={'auto'} direction={'column'} h={'80vh'} w={'80%'}>
        <CartProductList products={user?.data?.cart} navigate={navigate} />
      </Flex>
      <Box pos={'absolute'} h={'auto'} w={'100%'} bottom={0} style={{zIndex: 5}} bd={'1px solid green.0'}>
        <Flex px={'xl'} h={'100%'} w={'100%'} justify={'space-between'} align={'center'} direction={'row'}>
          <Box>

            <Text>
              Total Items: {user?.data?.cart?.reduce((acc, product) => acc + product.quantity, 0)}
            </Text>
          </Box>
          <Flex direction={'column'} h={'100%'} justify={'space-evenly'}>

            <Text component='div' ta={'center'} >
              Total MRP: <Text component='span' bg={slantLineThrough}>₹{(user?.data?.cart?.reduce((acc, product) => acc + product?.productId?.markedPrice * product?.quantity, 0).toFixed(2))}</Text>  
            </Text>
            <Text ta={'center'} size='xl' c={'green.0'}>
              LazeyStore Discounted Price: ₹{(user?.data?.cart?.reduce((acc, product) => acc + product?.productId?.salePrice * product?.quantity, 0).toFixed(2))}
            </Text>
          </Flex>
          <Box>
            <BasicButton>Checkout</BasicButton>
          </Box>
        </Flex>
      </Box>

    </Box>
  )
}

export default Cart