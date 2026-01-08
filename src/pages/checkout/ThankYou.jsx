import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Center, Flex, Text, Paper, Stack, Divider } from '@mantine/core';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { selectLatestOrder } from '../../redux/selectors/ordersSelector';
import { BasicButton, OutlineButton } from '../../components/buttons/Buttons';

function ThankYou() {
    const latestOrder = useSelector(selectLatestOrder);
    const navigate = useNavigate();

    if (!latestOrder) {
        return (
            <Center h="80vh">
                <Stack align="center">
                    <Text size="xl">Looking for your order...</Text>
                    <BasicButton onClick={() => navigate('/orders')}>Go to Orders</BasicButton>
                </Stack>
            </Center>
        );
    }

    return (
        <Center h="100vh" bg="#fcfcfc">
            <Paper withBorder p={40} radius="md" shadow="md" w={{ base: '90%', sm: 500 }}>
                <Stack align="center" spacing="lg">
                    <IconCircleCheckFilled size={80} color="var(--mantine-color-green-0)" />

                    <Box ta="center">
                        <Text size="2rem" fw={800} c="green.0" style={{ lineHeight: 1.2 }}>
                            Success!
                        </Text>
                        <Text size="lg" fw={500} c="dimmed">
                            Your order has been placed.
                        </Text>
                    </Box>

                    <Divider w="100%" label="Order Info" labelPosition="center" />

                    <Box ta="center" w="100%">
                        <Text size="sm" c="dimmed">Order ID</Text>
                        <Text fw={700} ff="monospace" size="lg">
                            {latestOrder._id.toUpperCase()}
                        </Text>
                        
                        <Flex justify="space-between" mt="md">
                            <Text size="sm">Amount Paid:</Text>
                            <Text size="sm" fw={700}>₹{latestOrder.totalAmount}</Text>
                        </Flex>
                        <Text size="xs" c="dimmed" mt={5}>
                            A confirmation email has been sent to your registered address.
                        </Text>
                    </Box>

                    <Flex gap="md" w="100%" direction={{ base: 'column', sm: 'row' }}>
                        <OutlineButton 
                            onClick={() => navigate('/orders')} 
                            style={{ flex: 1 }}
                        >
                            Track Order
                        </OutlineButton>
                        <BasicButton 
                            onClick={() => navigate('/')} 
                            style={{ flex: 1 }}
                        >
                            Continue Shopping
                        </BasicButton>
                    </Flex>
                </Stack>
            </Paper>
        </Center>
    );
}

export default ThankYou;