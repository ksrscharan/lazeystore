import { Box, Center, Flex, Grid, GridCol, Image, Input, InputWrapper, NumberFormatter, NumberInput, Paper, PasswordInput, ScrollArea, SegmentedControl, Text, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getNewAccessToken } from '../../redux/thunk/account'
import { getUser } from '../../redux/thunk/userProduct'
import Navbar from '../../components/navbar/Navbar'
import { IconBuildingCommunity, IconBuildingEstate, IconCreditCard, IconCurrentLocation, IconLocationFilled, IconMail, IconMapPin, IconPhone, IconRoad } from '@tabler/icons-react'
import { BasicButton } from '../../components/buttons/Buttons'
import { initiateNewOrder } from '../../redux/thunk/orders'

function Checkout() {
  const user = useSelector(state => state.userDetails.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.accessToken.token)
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [isAddressValid, setIsAddressValid] = useState({
    houseNumber: true,
    street: true,
    landmark: true,
    area: true,
    state: true,
    pincode: true,
    card: true
  })
  const [enteredAddress, setEnteredAddress] = useState({
    houseNumber: null,
    street: null,
    landmark: null,
    area: null,
    state: null,
    pincode: null,
  })
  const [paymentMode, setPaymentMode] = useState("Debit Card")
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
      if (user?.data?.cart?.length < 1) {
        navigate('/cart')
      }
      setTotalAmount(user?.data?.cart?.reduce((acc, product) => acc + product?.productId?.salePrice * product?.quantity, 0).toFixed(2))
    }
  }, [user])
  return (
    <>
      <Navbar />
      {user?.data && <>
        <Flex w={'100vw'} h={'85vh'}>
          <Box px={'sm'} grow={1} w={'50%'} style={{ borderRight: '3px solid black' }}>
            <Text fw={500} size='xl' mt={'lg'}>
              My Bag
            </Text>
            <hr />
            {user?.data?.cart?.length > 0 &&
              <Box>
                <ScrollArea>

                  {
                    user?.data?.cart?.map(product => {
                      return (
                        <Paper
                          key={product._id}
                          withBorder
                          py="md"
                          my={'md'}
                          radius="md"
                          shadow="xs"
                          sx={(theme) => ({
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: theme.shadows.md,
                              borderColor: theme.colors.green[0]
                            }
                          })}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigate(`/product/${product.productId.slug}`)
                          }}
                        >
                          <Grid align={'center'} gap={'xl'} justify={'space-between'} w={'98%'}>
                            <GridCol span={2}>
                              <Image ml={'sm'} src={product?.productId?.imageUrl[0]} w={'100px'} />
                            </GridCol>
                            <GridCol span={8}>
                              <Text ta={'left'} size='xl'>{product?.productId?.title} - {product?.productId?.subTitle}</Text>
                              <Text>Qty: {product?.quantity} x ₹ {product?.productId?.salePrice}</Text>
                            </GridCol>
                            <GridCol span={2}>
                              <Text px={'sm'} c={'green.0'}><NumberFormatter prefix='₹ ' thousandsGroupStyle='lakh' thousandSeparator=',' value={product?.quantity * product?.productId?.salePrice} /></Text>
                            </GridCol>
                          </Grid>
                        </Paper>
                      )
                    })
                  }
                </ScrollArea>
              </Box>}
          </Box>
          <Box w={'40%'} mx={'auto'}>
            <Text c={'green.0'} mt={'lg'} size='xl' fw={500}>Please Enter Details Below:</Text>
            <hr />
            <Grid>
              <GridCol span={6}>
                <TextInput required label="First Name" value={user?.data?.firstName} disabled />
              </GridCol>
              <GridCol span={6}>
                <TextInput required label="Last Name" value={user?.data?.lastName} disabled />
              </GridCol>
              <GridCol span={6}>
                <TextInput required label="Email Address" value={user?.data?.email} disabled rightSection={<IconMail />} />
              </GridCol>
              <GridCol span={6}>
                <NumberInput required type='tel' label="Phone Number" rightSection={<IconPhone />} />
              </GridCol>
            </Grid>
            <Text mt={'lg'} c={'green.0'} size='xl' fw={500}>Delivery Address</Text>
            <hr />
            <Grid my={'lg'}>
              <GridCol span={6}>
                <TextInput
                  required
                  rightSection={<IconBuildingCommunity />}
                  label='House Number'
                  onChange={(e) => {
                    setEnteredAddress({ ...enteredAddress, houseNumber: e.target.value })
                    console.log(e.target.value);
                  }}
                  error={!isAddressValid.houseNumber}
                  onBlur={(e) => {
                    if (e.target.value.length < 1) {
                      setIsAddressValid({ ...isAddressValid, houseNumber: false })
                    }
                  }}
                  onFocus={() => {
                    setIsAddressValid({ ...isAddressValid, houseNumber: true })

                  }}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  required
                  label='Street'
                  rightSection={<IconRoad />}
                  onChange={(e) => {
                    setEnteredAddress({ ...enteredAddress, street: e.target.value })
                    console.log(e.target.value);
                  }}
                  error={!isAddressValid.street}
                  onBlur={(e) => {
                    if (e.target.value.length < 1) {
                      setIsAddressValid({ ...isAddressValid, street: false })
                    }
                  }}
                  onFocus={() => {
                    setIsAddressValid({ ...isAddressValid, street: true })

                  }}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  required
                  label='Village / Town / Locality'
                  rightSection={<IconCurrentLocation />}
                  onChange={(e) => {
                    setEnteredAddress({ ...enteredAddress, landmark: e.target.value })
                    console.log(e.target.value);

                  }}
                  error={!isAddressValid.landmark}
                  onBlur={(e) => {
                    if (e.target.value.length < 1) {
                      setIsAddressValid({ ...isAddressValid, landmark: false })
                    }
                  }}
                  onFocus={() => {
                    setIsAddressValid({ ...isAddressValid, landmark: true })

                  }}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  required
                  label='City / District'
                  rightSection={<IconLocationFilled />}
                  onChange={(e) => {
                    setEnteredAddress({ ...enteredAddress, area: e.target.value })
                    console.log(e.target.value);

                  }}
                  error={!isAddressValid.area}
                  onBlur={(e) => {
                    if (e.target.value.length < 3) {
                      setIsAddressValid({ ...isAddressValid, area: false })
                    }
                  }}
                  onFocus={() => {
                    setIsAddressValid({ ...isAddressValid, area: true })

                  }}
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  required
                  rightSection={<IconBuildingEstate />}
                  label='State'
                  onChange={(e) => {
                    setEnteredAddress({ ...enteredAddress, state: e.target.value })
                    console.log(e.target.value);

                  }}
                  error={!isAddressValid.state}
                  onBlur={(e) => {
                    if (e.target.value.length < 2) {
                      setIsAddressValid({ ...isAddressValid, state: false })
                    }
                  }}
                  onFocus={() => {
                    setIsAddressValid({ ...isAddressValid, state: true })

                  }}
                />
              </GridCol>
              <GridCol span={6}>
                <NumberInput
                  type='text'
                  required
                  rightSection={<IconMapPin />}
                  label='PIN Code'
                  placeholder='6 Digit Valid PIN Code'
                  onChange={(e) => {
                    setEnteredAddress({ ...enteredAddress, pincode: e })
                    console.log(e);
                  }}
                  error={!isAddressValid.pincode && "Invalid PIN Code. Enter Valid 6 Digit PIN Code"}
                  onBlur={(e) => {
                    if (e.target.value.length < 6 || e.target.value.length > 6) {
                      setIsAddressValid({ ...isAddressValid, pincode: false })
                    }
                  }}
                  onFocus={() => {
                    setIsAddressValid({ ...isAddressValid, pincode: true })

                  }}
                />
              </GridCol>
            </Grid>
            <Text fw={500} size='xl' my={'lg'} c={'green.0'}>Select Payment Method</Text>
            <hr />
            <Flex justify={'space-between'} align={'center'}>

              <SegmentedControl component={'span'} onChange={setPaymentMode} defaultValue='Debit Card' data={["UPI", "Credit Card", "Debit Card", "COD"]} />
              <Text size='xl' c={'green.0'}>₹ {totalAmount}</Text>
            </Flex>

            {paymentMode && (paymentMode === "Credit Card" || paymentMode === "Debit Card") &&
              <>
                <Grid my={'md'} justify='space-between'>
                  <GridCol span={6}>
                    <NumberInput
                      onBlur={(e) => {
                        const val = e.trim();
                        if (val.length !== 16) {
                          setIsAddressValid(prev => ({ ...prev, card: false }));
                        }
                      }}

                      onFocus={() => {
                        setIsAddressValid(prev => ({ ...prev, card: true }));
                      }}
                      maxLength={16}
                      required
                      rightSection={<IconCreditCard />}
                      placeholder="XXXX XXXX XXXX XXXX"
                      error={!isAddressValid.card && `Invalid ${paymentMode} Number. Must be 16 digits.`}
                    />
                  </GridCol>
                  <GridCol span={2}>
                    <TextInput required placeholder='MM/YY' />
                  </GridCol>
                  <GridCol span={2}>
                    <PasswordInput required placeholder='CVV' />
                  </GridCol>
                  <GridCol span={2}>
                    <Image w={'30px'} src={'https://framerusercontent.com/images/BZsl8AsorPqWdRhXjy0jVBAIhQ.png'} />
                  </GridCol>
                </Grid>
                <Image src={'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg'} />
              </>
            }

            <Box w={'100%'} my={'lg'}>
              <Box>
                {/* {!selectedAddress && <Text>
              Address: {`${enteredAddress.houseNumber}, ${enteredAddress.street}, ${enteredAddress.landmark}, ${enteredAddress.area}, ${enteredAddress.state}, ${enteredAddress.pincode} `}
            </Text>} */}
                <Flex justify={'space-between'}>
                  <Box>
                    <Text size='xs'>*45 Day Free Returns: Applicable to Indian orders only</Text>
                    <Text size='xs'>**Lifetime Waranty: One replacement per paid pair</Text>
                  </Box>

                  <BasicButton
                    onClick={() => {
                      dispatch(initiateNewOrder({
                        user: user?.data,
                        selectedAddress: enteredAddress,
                        totalAmount: totalAmount
                      })).unwrap()
                        .then((payload) => {
                          if (payload.message === "order placed successfully") {
                            navigate('/thankyou', { state: { orderId: payload.data._id } });
                          }
                        })
                        .catch((error) => {
                          console.error("Order failed:", error);
                        });
                    }}
                    disabled={!Object.values(enteredAddress).every(x => x !== null && x !== '') || !Object.values(isAddressValid).every(x => x === true) || user?.data?.cart?.length < 1}

                  >
                    Place Order
                  </BasicButton>
                </Flex>
              </Box>
            </Box>
          </Box>

        </Flex>
        <Box pos={'absolute'} bottom={0} w={'100%'} bg={'green.0'}>
          <Text ta={'center'} size='sm'>Lazey store © 2026 | Contact: support@lazeystore.com
          </Text>
        </Box>

      </>}
      {
        !token && <Box h={'80vh'} m={"auto"} >
          <Flex mih={'100%'} justify={'center'} align={'center'}>
            <Text size='xl' c={'green.0'} fw={500}>
              Seems Like You're not Logged In
            </Text>
          </Flex>
        </Box>
      }
    </>
  )
}

export default Checkout