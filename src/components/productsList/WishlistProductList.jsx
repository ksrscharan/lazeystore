import { Badge, Box, Flex, Image, Rating, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { slantLineThrough } from '../../helpers/variables';
import { OutlineButton } from '../buttons/Buttons';
import EmptyWishlist from '../emptyPages/EmptyWishlist';
import { removeFromWishlist } from '../../redux/thunk/userProduct';

function WishlistProductList({ products, navigate }) {
    const dispatch = useDispatch();
    return (
        <>
            {
                products?.length < 1 ? 
                <EmptyWishlist /> :
                    <ScrollArea type='hover' w={'100%'}>
                        {products?.map((product) => (
                            <Box
                                bd={'1px solid var(--mantine-color-green-0)'}
                                bdrs={'md'}
                                key={product.productId?._id}
                                my={'sm'}
                                p={'sm'}
                                style={{ zIndex: 5 }}
                                w={'100%'}
                            >
                                <Flex gap={'sm'} justify={'space-evenly'}>
                                    <Image
                                        src={product.productId?.imageUrl[0]}
                                        visibleFrom="lg"
                                        w={'10%'}
                                        loading='lazy'
                                    />
                                    <Box
                                        w={'40%'}
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
                                    <Box>
                                        <Flex h={'100%'} justify={'center'} align={'center'}>
                                            <OutlineButton
                                                onClick={() => {
                                                    dispatch(removeFromWishlist(product?.productId))
                                                }}
                                            >Remove From Wishlist</OutlineButton>
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

export default WishlistProductList