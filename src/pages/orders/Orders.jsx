import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../redux/thunk/orders';
import { selectAllOrders } from '../../redux/selectors/ordersSelector';
import { 
    Container, Text, Badge, Stack, Loader, Center, Box, 
    Grid, Flex, ScrollArea, Image, Paper, Transition, ActionIcon, Tooltip, 
    Group
} from '@mantine/core';
import { getNewAccessToken } from '../../redux/thunk/account';
import { getUser } from '../../redux/thunk/userProduct';
import Navbar from '../../components/navbar/Navbar';
import { OutlineButton } from '../../components/buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { IconChevronRight, IconPackageOff } from '@tabler/icons-react';

function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector(selectAllOrders);
    const token = useSelector(state => state.accessToken.token);
    const isLoading = useSelector(state => state.orders.allOrders === null);

    useEffect(() => {
        if (!token) getNewAccessToken(dispatch);
    }, [dispatch, token]);

    useEffect(() => {
        if (token) {
            dispatch(getUser());
            dispatch(getUserOrders());
        }
    }, [dispatch, token]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'teal';
            case 'shipped': return 'blue';
            case 'pending': return 'orange';
            case 'paid': return 'green.0';
            case 'unpaid': return 'red';
            case 'refunded': return 'gray';
            default: return 'gray';
        }
    };

    if (isLoading) {
        return (
            <Center h="80vh">
                <Loader color="green.0" size="xl" type="dots" />
            </Center>
        );
    }

    return (
        <>
            <Navbar />
            <Container size="xl" h={'90vh'} py="md">
                <Flex justify="space-between" align="flex-end" mb="md">
                    <Box>
                        <Text size='2rem' fw={700} c={'green.0'} style={{ lineHeight: 1 }}>Your Orders</Text>
                        <Text size="sm" c="dimmed">Manage and track your recent purchases</Text>
                    </Box>
                    <Text size="sm" fw={500}>{orders?.length || 0} Orders placed</Text>
                </Flex>

                <hr style={{ border: '0.5px solid #eee', marginBottom: '20px' }} />

                <ScrollArea h={'calc(100% - 120px)'} offsetScrollbars scrollbarSize={6}>
                    {orders && orders.length > 0 ? (
                        <Stack spacing="lg" pr="md">
                            {orders.map((order) => (
                                <Paper 
                                    key={order._id} 
                                    withBorder 
                                    p="md" 
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
                                >
                                    <Grid gutter="xl" align="center">
                                        <Grid.Col span={{ base: 12, sm: 2 }}>
                                            <Box pos="relative" w={100} h={100} mx="auto">
                                                <Image 
                                                    src={order.items?.[0]?.productId?.imageUrl?.[0]} 
                                                    radius="md"
                                                    height={100}
                                                    fallbackSrc="https://placehold.co/100x100?text=No+Image"
                                                />
                                                {order.items?.length > 1 && (
                                                    <Badge 
                                                        pos="absolute" bottom={-5} right={-5} 
                                                        variant="filled" color="dark" size="sm"
                                                    >
                                                        +{order.items.length - 1} more
                                                    </Badge>
                                                )}
                                            </Box>
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, sm: 6 }}>
                                            <Stack spacing="xs">
                                                <Group spacing="xs">
                                                    <Badge color={getStatusColor(order.paymentStatus)} variant="light">
                                                        {order.paymentStatus}
                                                    </Badge>
                                                    <Badge color={getStatusColor(order.deliveryStatus)} variant="dot">
                                                        {order.deliveryStatus}
                                                    </Badge>
                                                    <Text size="xs" c="dimmed" ff="monospace">ID: {order._id.slice(-8).toUpperCase()}</Text>
                                                </Group>

                                                <Box>
                                                    {order.paymentStatus === "Unpaid" ? (
                                                        <Text size="sm" fw={500} c="red.6">Action Required: Complete payment to confirm order.</Text>
                                                    ) : (
                                                        <Text size="sm" c="dimmed">
                                                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </Text>
                                                    )}
                                                </Box>

                                                <Text size="sm" c="green.0">
                                                    {order.paymentStatus === "Paid" && "📦 Everything looks good! We are preparing your package."}
                                                    {order.paymentStatus === "Refunded" && `💸 Amount ₹${order.totalAmount} has been credited back.`}
                                                </Text>
                                            </Stack>
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, sm: 4 }}>
                                            <Flex direction="column" align={{ base: 'center', sm: 'flex-end' }} gap="sm">
                                                <Text fw={700} size="xl" c="green.0">
                                                    ₹{order.totalAmount.toLocaleString('en-IN')}
                                                </Text>
                                                <OutlineButton 
                                                    fullWidth
                                                    rightIcon={<IconChevronRight size={16} />}
                                                    onClick={() => navigate(`/orders/${order._id}`)}
                                                >
                                                    View Details
                                                </OutlineButton>
                                            </Flex>
                                        </Grid.Col>
                                    </Grid>
                                </Paper>
                            ))}
                        </Stack>
                    ) : (
                        <Center h="50vh">
                            <Stack align="center" spacing="xs">
                                <IconPackageOff size={50} stroke={1.5} color="gray" />
                                <Text size="lg" fw={500} c="dimmed">No orders found yet</Text>
                                <OutlineButton onClick={() => navigate('/shop')}>Start Shopping</OutlineButton>
                            </Stack>
                        </Center>
                    )}
                </ScrollArea>
            </Container>
        </>
    );
}

export default Orders;