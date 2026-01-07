import { Box, Flex, Grid, GridCol, Image, Input, InputWrapper, NumberFormatter, NumberInput, PasswordInput, ScrollArea, SegmentedControl, Text, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getNewAccessToken } from '../../redux/thunk/account'
import { getUser } from '../../redux/thunk/userProduct'
import Navbar from '../../components/navbar/Navbar'
import { IconBuildingCommunity, IconBuildingEstate, IconCreditCard, IconCurrentLocation, IconLocationFilled, IconMapPin, IconRoad } from '@tabler/icons-react'
import { BasicButton } from '../../components/buttons/Buttons'
import { initiateNewOrder } from '../../redux/thunk/orders'

function Checkout() {
  const user = useSelector(state => state.userDetails.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.accessToken.token)
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [enteredAddress, setEnteredAddress] = useState({
    houseNumber: null,
    street: null,
    landmark: null,
    area: null,
    state: null,
    pincode: null,
  })
  const [paymentMode, setPaymentMode] = useState(null)
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
    <>
      <Navbar />
      {user?.data ? <>
        <Flex w={'100vw'} h={'80vh'}>
          <Box grow={1} w={'50%'} bd={'1px solid red'}>
            <Text size='xl'>Congrats {user?.data?.firstName}, You're just a step away from ordering.</Text>
            <Text>These are your Products: </Text>
            {user?.data?.cart?.length > 0 &&
              <Box>
                <ScrollArea>

                  {
                    user?.data?.cart?.map(product => {
                      return (
                        <Flex h={'100px'} align={'center'} gap={'xl'} bd={'1px solid red'} justify={'space-between'}>
                          <Image src={product?.productId?.imageUrl[0]} w={'100px'} />
                          <Text>{product?.productId?.title}</Text>
                          <Text>{product?.quantity} No. x ₹ {product?.productId?.salePrice}</Text>
                          <Text c={'green.0'}><NumberFormatter prefix='₹ ' thousandsGroupStyle='lakh' thousandSeparator=',' value={product?.quantity * product?.productId?.salePrice} /></Text>
                        </Flex>
                      )
                    })
                  }
                </ScrollArea>
              </Box>}
            <Text c={'green.0'} ta={'right'} bd={'1px solid red'}>
              Total: <NumberFormatter prefix='₹ ' thousandsGroupStyle='lakh' thousandSeparator=',' value={totalAmount} />
            </Text>
          </Box>
          <Box w={'40%'} mx={'auto'}>
            <Text>Please Enter Details Below:</Text>
            <Grid>
              <GridCol span={6}>
                <Input value={user?.data?.firstName} disabled />
              </GridCol>
              <GridCol span={6}>
                <Input value={user?.data?.lastName} disabled />
              </GridCol>
              <GridCol span={6}>
                <Input value={user?.data?.email} disabled />
              </GridCol>
            </Grid>
            <Grid my={'sm'}>
              <GridCol span={6}>
                <TextInput rightSection={<IconBuildingCommunity />} label='House Number' onChange={(e) => {
                  setEnteredAddress({ ...enteredAddress, houseNumber: e.target.value })
                  console.log(e.target.value);

                }} />
              </GridCol>
              <GridCol span={6}>
                <TextInput label='Street' rightSection={<IconRoad />} onChange={(e) => {
                  setEnteredAddress({ ...enteredAddress, street: e.target.value })
                  console.log(e.target.value);
                }} />
              </GridCol>
              <GridCol span={6}>
                <TextInput label='Landmark' rightSection={<IconCurrentLocation />} onChange={(e) => {
                  setEnteredAddress({ ...enteredAddress, landmark: e.target.value })
                  console.log(e.target.value);

                }} />
              </GridCol>
              <GridCol span={6}>
                <TextInput label='Area' rightSection={<IconLocationFilled />} onChange={(e) => {
                  setEnteredAddress({ ...enteredAddress, area: e.target.value })
                  console.log(e.target.value);

                }} />
              </GridCol>
              <GridCol span={6}>
                <TextInput rightSection={<IconBuildingEstate />} label='State' onChange={(e) => {
                  setEnteredAddress({ ...enteredAddress, state: e.target.value })
                  console.log(e.target.value);

                }} />
              </GridCol>
              <GridCol span={6}>
                <NumberInput rightSection={<IconMapPin />} label='Pincode' placeholder='6 Digit Valid Pin Code' onChange={(e) => {
                  setEnteredAddress({ ...enteredAddress, pincode: e.target.value })
                  console.log(e.target.value);

                }} />
              </GridCol>
            </Grid>

            <SegmentedControl onChange={setPaymentMode} data={["UPI", "Credit Card", "Debit Card", "COD"]} />
            {paymentMode && (paymentMode === "Credit Card" || paymentMode === "Debit Card") &&
              <Grid my={'md'}>
                <GridCol span={6}>
                  <NumberInput rightSection={<IconCreditCard />} placeholder={`${paymentMode} Number`} />
                </GridCol>
                <GridCol span={2}>
                  <TextInput placeholder='MM/YY' />
                </GridCol>
                <GridCol span={2}>
                  <PasswordInput placeholder='CVV' />
                </GridCol>
              </Grid>
            }
          </Box>
        </Flex>
        <Box pos={'absolute'} bottom={0} w={'100%'} bd={'1px solid red'}>
          <BasicButton
            onClick={() => {
              dispatch(initiateNewOrder({
                user: user?.data,
                selectedAddress: enteredAddress,
                totalAmount: totalAmount
              }))
            }}
          >
            Place Order
          </BasicButton>
        </Box>
      </> : <Text>Loading</Text>}

    </>
  )
}

export default Checkout