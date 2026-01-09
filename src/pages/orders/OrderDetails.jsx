import { Box, Center, Flex, Grid, GridCol, Image, Loader, NumberFormatter, Paper, ScrollArea, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../redux/thunk/orders';
import { selectCurrentOrder } from '../../redux/selectors/ordersSelector';
import { getUser } from '../../redux/thunk/userProduct';
import { getNewAccessToken } from '../../redux/thunk/account';
import Container from '../../components/container/Container';

function OrderDetails() {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector(selectCurrentOrder);
    const token = useSelector((state) => state.accessToken.token);
    const user = useSelector((state) => state.userDetails.user);

    useEffect(() => {
        if (!token) getNewAccessToken(dispatch);
    }, [dispatch, token]);

    useEffect(() => {
        if (token && orderId) {
            dispatch(getUser());
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, token, orderId]);

    if (!order) {
        return (
            <Container>
                <Center h="80vh">
                    <Loader color="green.0" size="xl" type="dots" />
                </Center>
            </Container>
        );
    }

    return (
        <Container>
            <Flex direction="column" h="100%" style={{ overflow: 'hidden' }}>
                <ScrollArea
                    type="hover"
                    scrollbars="y"
                    styles={{
                        viewport: { overflowX: 'hidden' },
                        scrollbar: { width: 8 },
                    }}
                >
                    <Flex
                        direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
                        gap={'md'}
                        h={'100%'}
                    >
                        <Box
                            px="sm"
                            grow={1}
                            w={{ xs: '100%', sm: '100%', md: '100%', lg: '50%', xl: '50%' }}
                        >
                            <Text fw={500} size="xl" mt="lg">
                                Your Order Items
                            </Text>
                            <hr />
                            {order?.items?.length > 0 && (
                                <Box>
                                    <ScrollArea>
                                        {order.items.map((product) => (
                                            <Paper
                                                key={product._id}
                                                withBorder
                                                py="md"
                                                my="md"
                                                radius="md"
                                                shadow="xs"
                                                sx={(theme) => ({
                                                    transition: 'all 0.2s ease',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: theme.shadows.md,
                                                        borderColor: theme.colors.green[0],
                                                    },
                                                })}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    navigate(`/product/${product.productId.slug}`);
                                                }}
                                            >
                                                <Grid align="center" gap="xl" justify="space-between" w="98%">
                                                    <GridCol span={{ xs: 12, sm: 12, md: 12, lg: 2, xl: 2 }}>
                                                        <Image
                                                            width="100%"
                                                            m="auto"
                                                            fallbackSrc="https://placehold.co/100x100?text=No+Image"
                                                            src={product?.productId?.imageUrl?.[0]}
                                                            w={{ xs: '90%', sm: '100%', md: '100%', lg: '50px', xl: '50px' }}
                                                        />
                                                    </GridCol>
                                                    <GridCol span={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
                                                        <Text
                                                            m="auto"
                                                            ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}
                                                            size="xl"
                                                        >
                                                            {product?.productId?.title} - {product?.productId?.subTitle}
                                                        </Text>
                                                        <Text
                                                            m="auto"
                                                            ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}
                                                        >
                                                            Qty: {product?.quantity} x ₹ {product?.productId?.salePrice}
                                                        </Text>
                                                    </GridCol>
                                                    <GridCol span={{ xs: 12, sm: 12, md: 12, lg: 2, xl: 2 }}>
                                                        <Text
                                                            m="auto"
                                                            px="sm"
                                                            c="green.0"
                                                            ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}
                                                            size="xl"
                                                        >
                                                            <NumberFormatter
                                                                fw={500}
                                                                prefix="₹ "
                                                                thousandsGroupStyle="lakh"
                                                                thousandSeparator=","
                                                                value={product?.quantity * product?.productId?.salePrice}
                                                            />
                                                        </Text>
                                                    </GridCol>
                                                </Grid>
                                            </Paper>
                                        ))}
                                    </ScrollArea>
                                </Box>
                            )}
                        </Box>

                        <Box w={{ xs: '90%', sm: '100%', md: '100%', lg: '45%', xl: '45%' }} mx="auto">
                            <Text c="green.0" mt="lg" size="xl" fw={500}>
                                Delivery Address
                            </Text>
                            <hr />
                            <Text my="md">
                                {`${order?.shippingAddress?.houseNumber}, ${order?.shippingAddress?.street}, ${order?.shippingAddress?.landmark}, ${order?.shippingAddress?.area}, ${order?.shippingAddress?.state}, ${order?.shippingAddress?.pincode}`}
                            </Text>

                            <Text mt="lg" c="green.0" size="xl" fw={500}>
                                Order Summary
                            </Text>
                            <hr />
                            <Flex w="100%" justify="space-between" my="md"
                                direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}

                            >
                                <Box>
                                    <Text>Total Amount: ₹ {order.totalAmount}</Text>
                                    <Text>
                                        Total Quantity: {order.items.length} {order.items.length < 2 ? 'Item' : 'Items'}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text>Payment Status: {order.paymentStatus}</Text>
                                </Box>
                            </Flex>

                            <Box w="100%" my="lg">
                                <Flex justify="space-between" direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}>
                                    <Box>
                                        <Text size="xs">*45 Day Free Returns: Applicable to Indian orders only</Text>
                                        <Text size="xs">**Lifetime Warranty: One replacement per paid pair</Text>
                                    </Box>
                                </Flex>
                            </Box>

                            <Text c="green.0" mt="lg" size="xl" fw={500}>
                                Delivery Status
                            </Text>
                            <hr />
                            {order.deliveryStatus === 'Pending' && (
                                <Text size="sm" c="dimmed">
                                    We've received your order! Our team is waiting for payment confirmation to begin preparing your items.
                                </Text>
                            )}
                            {order.deliveryStatus === 'Processing' && (
                                <Text size="sm" c="dimmed">
                                    Your order is being hand-picked and packed with care in our warehouse. We'll notify you once it's ready for dispatch.
                                </Text>
                            )}
                            {order.deliveryStatus === 'Shipped' && (
                                <Text size="sm" c="dimmed">
                                    Great news! Your package is on its way. It has been handed over to our courier partner and is currently in transit.
                                </Text>
                            )}
                            {order.deliveryStatus === 'Delivered' && (
                                <Text size="sm" fw={500} c="green.0">
                                    Package delivered! We hope you love your new purchase. If you have any issues, please contact support.
                                </Text>
                            )}
                            {order.deliveryStatus === 'Cancelled' && (
                                <Text size="sm" c="red.6">
                                    This order has been cancelled. If this was a mistake or you've already been charged, please check your refund status.
                                </Text>
                            )}
                        </Box>
                    </Flex>
                </ScrollArea>
            </Flex>
        </Container >
    );
}

export default OrderDetails;