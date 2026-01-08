import { Box, Center, Flex, Grid, GridCol, Image, Loader, NumberFormatter, Paper, ScrollArea, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails } from '../../redux/thunk/orders';
import { selectCurrentOrder } from '../../redux/selectors/ordersSelector';
import { getUser } from '../../redux/thunk/userProduct';
import { getNewAccessToken } from '../../redux/thunk/account';
import Navbar from '../../components/navbar/Navbar';

function OrderDetails() {
    const orderId = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector(selectCurrentOrder);
    const token = useSelector(state => state.accessToken.token);

    useEffect(() => {
        if (!token) getNewAccessToken(dispatch);
    }, [dispatch, token]);

    useEffect(() => {
        if (token && orderId.id) {
            dispatch(getUser());
            dispatch(getOrderDetails(orderId.id));
        }
    }, [dispatch, token, orderId.id]);
    useEffect(() => {
        console.log(order);

    }, [order])
    if (!order) {
        return (
            <Center h="80vh">
                <Loader color="green.0" size="xl" type="dots" />
            </Center>
        );
    }
    return (
        <>
            <Navbar />
            <Flex w={'100vw'} h={'85vh'}>
                <Box px={'sm'} grow={1} w={'50%'} style={{ borderRight: '3px solid black' }}>
                    <Text fw={500} size='xl' mt={'lg'}>
                        My Bag
                    </Text>
                    <hr />
                    <Box>
                        <ScrollArea>
                            {
                                order?.items?.map(product => {
                                    return (
                                        <Paper
                                            key={order._id}
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
                                            <Grid h={'100px'} align={'center'} gap={'xl'} justify={'space-between'} w={'98%'}>
                                                <GridCol span={2}>
                                                    <Image ml={'sm'} src={product?.productId?.imageUrl[0]} w={'100px'} />
                                                </GridCol>
                                                <GridCol span={6}>
                                                    <Text ta={'left'} size='xl'>{product?.productId?.title} - {product?.productId?.subTitle}</Text>
                                                    <Text>Qty: {product?.quantity} x ₹ {product?.productId?.salePrice}</Text>
                                                </GridCol>
                                                <GridCol span={4}>
                                                    <Text px={'sm'} c={'green.0'}><NumberFormatter prefix='₹ ' thousandsGroupStyle='lakh' thousandSeparator=',' value={product?.quantity * product?.productId?.salePrice} /></Text>
                                                </GridCol>
                                            </Grid>
                                        </Paper>
                                    )
                                })
                            }
                        </ScrollArea>
                    </Box>
                </Box>
                <Box w={'40%'} mx={'auto'}>
                    <Text c={'green.0'} mt={'lg'} size='xl' fw={500}>Delivery Address </Text>
                    <hr />
                    <Text>{`${order?.shippingAddress?.houseNumber}, ${order?.shippingAddress?.street}, ${order?.shippingAddress?.landmark}, ${order?.shippingAddress?.area}, ${order?.shippingAddress?.state}, ${order?.shippingAddress?.pincode}`}</Text>
                    <Text mt={'lg'} c={'green.0'} size='xl' fw={500}>Order Summary</Text>
                    <hr />
                    <Flex w={'100%'} justify={'space-between'}>
                        <Box>
                            <Text>Total Amount: ₹ {order.totalAmount}</Text>
                            <Text>Total Quantity: {order.items.length} {order.items.length < 2 ? "Item" : "Items"}</Text>
                        </Box>
                        <Box>
                            Payment Status: {order.paymentStatus}
                        </Box>
                    </Flex>
                    <Box w={'100%'} my={'lg'}>
                        <Box>
                            <Flex justify={'space-between'}>
                                <Box>
                                    <Text size='xs'>*45 Day Free Returns: Applicable to Indian orders only</Text>
                                    <Text size='xs'>**Lifetime Waranty: One replacement per paid pair</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                    <Text c={'green.0'} mt={'lg'} size='xl' fw={500}>Delivery Status </Text>
                    <hr />
                    {order.deliveryStatus === "Pending" && (
                        <Text size="sm" c="dimmed">
                            We've received your order! Our team is waiting for payment confirmation to begin preparing your items.
                        </Text>
                    )}

                    {order.deliveryStatus === "Processing" && (
                        <Text size="sm" c="dimmed">
                            Your order is being hand-picked and packed with care in our warehouse. We'll notify you once it's ready for dispatch.
                        </Text>
                    )}

                    {order.deliveryStatus === "Shipped" && (
                        <Text size="sm" c="dimmed">
                            Great news! Your package is on its way. It has been handed over to our courier partner and is currently in transit.
                        </Text>
                    )}

                    {order.deliveryStatus === "Delivered" && (
                        <Text size="sm" fw={500} c="green.0">
                            Package delivered! We hope you love your new purchase. If you have any issues, please contact support.
                        </Text>
                    )}

                    {order.deliveryStatus === "Cancelled" && (
                        <Text size="sm" c="red.6">
                            This order has been cancelled. If this was a mistake or you've already been charged, please check your refund status.
                        </Text>
                    )}
                </Box>
                <Box pos={'absolute'} bottom={0} w={'100%'} bg={'green.0'}>
                    <Text ta={'center'} size='sm'>LazeyStore © 2026 | Contact: support@lazeystore.com
                    </Text>
                </Box>

            </Flex>
        </>
    )
}

export default OrderDetails