import { Badge, Box, Flex, Image, Rating, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight, IconMinus, IconPlus } from '@tabler/icons-react';
import { slantLineThrough } from '../../helpers/variables';
import { OutlineButton } from '../buttons/Buttons';
import { addToCart, reduceFromCart, removeFromCart } from '../../redux/thunk/userProduct';
import { useDispatch } from 'react-redux';

function CartProductList({ products, navigate }) {
    const dispatch = useDispatch()
    return (
        <>
            {
                products?.length < 1 ? <EmptyCart /> :
                    <ScrollArea type='hover'>
                        {products?.map((product) => (
                            <Box
                                bd={'1px solid var(--mantine-color-green-0)'}
                                bdrs={'md'}
                                key={product.productId?._id}
                                my={'sm'}
                                style={{ zIndex: 5 }}
                                p={'sm'}
                                w={'100%'}
                            >
                                <Flex gap={'sm'} justify={'space-evenly'}>
                                    <Image
                                        src={product?.productId?.imageUrl?.length > 0 && product?.productId?.imageUrl[0]}
                                        visibleFrom="lg"
                                        w={'10%'}
                                        loading='lazy'
                                    />
                                    <Box
                                        w={'60%'}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            navigate(`/product/${product.productId?.slug}`);
                                        }}

                                    >
                                        <Flex align={'center'}>
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
                                        <Text size="lg">
                                            {product?.productId?.condition === "Refurbished" && "Refurbished - "}{product?.productId?.title} - {product?.productId?.subTitle}
                                        </Text>
                                        <Text c={'black'} size="xs">
                                            {product?.productId?.description}
                                        </Text>
                                        {product?.productId?.reviews && <Rating
                                            readOnly
                                            value={
                                                product.productId?.reviews.reduce((acc, review) => acc + review.rating, 0) / product.productId.reviews.length
                                            }
                                            fractions={2}
                                        />}
                                    </Box>
                                    <Box w={'20%'}>
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
                                    <Box w={'10%'}>
                                        <Flex direction={'column'} justify={'center'} align={'center'} w={'100%'}>
                                            <Text>Quantity: </Text>
                                            <Box w={'100%'}>
                                                <Flex w={'100%'} justify={'space-between'} align={'center'}>
                                                    <OutlineButton
                                                        onClick={() => {
                                                            dispatch(addToCart(product?.productId))
                                                        }}
                                                    >
                                                        <IconPlus />
                                                    </OutlineButton>
                                                    <Text>{product?.quantity}</Text>
                                                    <OutlineButton
                                                        onClick={() => {
                                                            dispatch(reduceFromCart(product?.productId))
                                                        }}
                                                    >
                                                        <IconMinus />
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
                            </Box>
                        ))
                        }
                    </ScrollArea>
            }
        </>


    )
}

export default CartProductList