import { Badge, Box, Flex, Image, Paper, Rating, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight, IconMinus, IconPlus } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { slantLineThrough } from '../../helpers/variables';
import { OutlineButton } from '../buttons/Buttons';
import EmptyCart from '../emptyPages/EmptyCart';
import { addToCart, reduceFromCart, removeFromCart } from '../../redux/thunk/userProduct';

function CartProductList({ products, navigate }) {
    const dispatch = useDispatch()
    return (
        <>
            {
                products?.length < 1 ? <EmptyCart /> :
                    <ScrollArea type='hover' w={'100%'}>
                        {products?.map((product) => (
                            <Paper
                                key={product.productId?._id}
                                withBorder
                                p="md"
                                my={'sm'}
                                mx={'auto'}
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
                                w={{ xs: '100%', sm: '80%', md: '100%', lg: '100%', xl: '100%' }}
                            >
                                {/* <Box
                                    bd={'1px solid var(--mantine-color-green-0)'}
                                    bdrs={'md'}
                                    key={product.productId?._id}
                                    my={'sm'}
                                    mx={'auto'}
                                    style={{ zIndex: 5 }}
                                    p={'sm'}
                                > */}
                                    <Flex gap={'sm'} justify={'space-evenly'} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}>
                                        <Image
                                            src={product?.productId?.imageUrl?.length > 0 && product?.productId?.imageUrl[0]}
                                            fallbackSrc="https://placehold.co/100x100?text=No+Image"
                                            // visibleFrom="lg"
                                            m={'auto'}
                                            w={{ xs: '90%', sm: '90%', md: '70%', lg: '10%', xl: '10%' }}
                                            loading='lazy'
                                        />
                                        <Box
                                            w={{ xs: '100%', sm: '100%', md: '100%', lg: '50%', xl: '50%' }}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                navigate(`/product/${product.productId?.slug}`);
                                            }}

                                        >
                                            <Flex align={'center'} justify={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}>
                                                <Badge
                                                    color="green.0"
                                                    size="xs"
                                                    style={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Text c={'black'} fw={100} size="xs" ta={'center'}>
                                                        {product.productId?.category}
                                                    </Text>
                                                </Badge>
                                                <IconArrowBadgeRight />
                                                <Badge
                                                    color="black"
                                                    size="xs"
                                                    style={{
                                                        alignItems: 'center',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Text c={'white'} fw={100} size="xs" ta={'center'}>
                                                        {product?.productId?.subCategory}
                                                    </Text>
                                                </Badge>
                                            </Flex>
                                            <Text size="lg" ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}>
                                                {product?.productId?.condition === "Refurbished" && "Refurbished - "}{product?.productId?.title} - {product?.productId?.subTitle}
                                            </Text>
                                            <Text c={'black'} size="xs" ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}>
                                                {product?.productId?.description}
                                            </Text>
                                            {product?.productId?.reviews && <Rating
                                                mx={{ xs: 'auto', sm: 'auto', md: 'auto', lg: 'inherit', xl: 'inherit' }}
                                                readOnly
                                                value={
                                                    product.productId?.reviews.reduce((acc, review) => acc + review.rating, 0) / product.productId.reviews.length
                                                }
                                                fractions={2}
                                            />}
                                        </Box>
                                        <Box w={{ xs: '100%', sm: '100%', md: '100%', lg: '20%', xl: '20%' }}>
                                            <Flex align={'center'} direction={'column'} justify={'space-evenly'} h={'100%'}>
                                                <Flex>
                                                    Market Price:&nbsp;
                                                    <Text c={'black'} size="md" bg={slantLineThrough}>
                                                        ₹ {product?.productId?.markedPrice}
                                                    </Text>
                                                </Flex>
                                                <Flex>

                                                    <Text component='div' c={'green.0'} size="lg" ta={'center'}>
                                                        LazeyStore: ₹ {product?.productId?.salePrice}
                                                    </Text>
                                                </Flex>

                                            </Flex>
                                        </Box>
                                        <Box w={{ xs: '100%', sm: '100%', md: '100%', lg: '15%', xl: '15%' }}>
                                            <Flex direction={'column'} justify={'center'} align={'center'} w={'100%'} gap={'xs'}>
                                                <Text>Quantity: </Text>
                                                <Box w={'100%'}>
                                                    <Flex w={'100%'} justify={'space-between'} align={'center'}>
                                                        <OutlineButton
                                                            onClick={() => {
                                                                dispatch(reduceFromCart(product?.productId))
                                                            }}
                                                        >
                                                            <IconMinus />
                                                        </OutlineButton>
                                                        <Text m={'auto'} size='xl' c={'green.0'}>{product?.quantity}</Text>
                                                        <OutlineButton
                                                            onClick={() => {
                                                                dispatch(addToCart(product?.productId))
                                                            }}
                                                        >
                                                            <IconPlus />
                                                        </OutlineButton>
                                                    </Flex>
                                                </Box>
                                                <Box w={'100%'}>
                                                    <OutlineButton
                                                        w={'100%'}
                                                        onClick={() => {
                                                            dispatch(removeFromCart(product?.productId))
                                                        }}
                                                    >Delete from Cart</OutlineButton>
                                                </Box>
                                            </Flex>
                                        </Box>


                                    </Flex>
                                {/* </Box> */}
                            </Paper>
                        ))
                        }
                    </ScrollArea>
            }
        </>


    )
}

export default CartProductList