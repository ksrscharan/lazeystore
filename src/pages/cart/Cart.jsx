import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Flex, NumberFormatter, Select, Text } from '@mantine/core'

import Navbar from '../../components/navbar/Navbar'
import { getNewAccessToken } from '../../redux/thunk/account'
import { getUser } from '../../redux/thunk/userProduct'
import CartProductList from '../../components/productsList/CartProductList'
import { slantLineThrough } from '../../helpers/variables'
import { BasicButton } from '../../components/buttons/Buttons'
import Container from '../../components/container/Container'

function Cart() {
  const user = useSelector(state => state.userDetails.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.accessToken.token)
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState("")
  useEffect(() => {
    if (!token) {
      getNewAccessToken(dispatch)
    }
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(getUser())
    }
  }, [token])
  useEffect(() => {
    if (user) {
      setTotalAmount(user?.data?.cart?.reduce((acc, product) => acc + product?.productId?.markedPrice * product?.quantity, 0).toFixed(2))
    }
  }, [user])
  return (
    <Container>
      <Flex
        align={'center'}
        m={'auto'}
        direction={'column'}
        h={{ xs: '80%', sm: '80%', md: '80%', lg: '80%', xl: '90%' }}
        w={{ xs: '90%', sm: '90%', md: '90%', lg: '80%', xl: '80%' }}
      >
        <CartProductList products={user?.data?.cart} navigate={navigate} />
      </Flex>
      {user?.data?.cart?.length > 0 &&
        <Box
          h={{ xs: '20%', sm: '20%', md: '20%', lg: '20%', xl: '10%' }}
          w={{ xs: '90%', sm: '90%', md: '100%', lg: '80%', xl: '80%' }}
          style={{ zIndex: 5 }}
          m={'auto'}

          bd={'1px solid green.0'}
        >
          <Flex px={'xl'} h={'100%'} w={'100%'} justify={'space-between'} align={'center'} direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
            <Box>

              <Text>
                Total Items: {user?.data?.cart?.reduce((acc, product) => acc + product.quantity, 0)}
              </Text>
            </Box>
            <Flex direction={'column'} h={'100%'} justify={'space-evenly'}>

              <Text component='div' ta={'center'} >
                Total MRP: <Text component='span' bg={slantLineThrough}>₹{(user?.data?.cart?.reduce((acc, product) => acc + product?.productId?.markedPrice * product?.quantity, 0).toFixed(2))}</Text>
              </Text>
              <Text ta={'center'} size={{ xs: 'sm', sm: 'sm', md: 'sm', lg: 'xl', xl: 'xl' }} c={'green.0'}>
                LazeyStore Discounted Price:  <NumberFormatter thousandsGroupStyle='lakh' thousandSeparator=',' prefix='₹' value={(user?.data?.cart?.reduce((acc, product) => acc + product?.productId?.salePrice * product?.quantity, 0).toFixed(2))} />
              </Text>
            </Flex>

            <Box>
              <BasicButton onClick={() => {
                navigate('/checkout')
              }}>Proceed to Checkout</BasicButton>
            </Box>
          </Flex>
        </Box>
      }
    </Container>

  )
}

export default Cart