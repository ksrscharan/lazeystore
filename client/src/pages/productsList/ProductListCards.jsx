import { Badge, Box, Flex, Image, Rating, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight } from '@tabler/icons-react';
import { slantLineThrough } from '../../helpers/variables';

function ProductListCards({ products, navigate }) {
    return (


        <ScrollArea type='hover'>
            {products?.map((product) => (
                <Box
                    bd={'1px solid var(--mantine-color-green-0)'}
                    bdrs={'md'}
                    key={product._id}
                    my={'sm'}
                    onClick={() => {
                        navigate(`/product/${product.slug}`);
                    }}
                    p={'sm'}
                    style={{ cursor: 'pointer', zIndex: 5 }}
                    w={'100%'}
                >
                    <Flex gap={'sm'} justify={'space-evenly'}>
                        <Image
                                src={product.imageUrl[0]}
                                visibleFrom="lg"
                                w={'10%'}
                                loading='lazy'
                                />
                        <Box w={'60%'}>
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
                                        {product.category}
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
                                        {product?.subCategory}
                                    </Text>
                                </Badge>
                            </Flex>
                            <Text size="lg">
                                {product?.condition === "Refurbished" && "Refurbished - "}{product?.title} - {product?.subTitle}
                            </Text>
                            <Text c={'black'} size="xs">
                                {product?.description}
                            </Text>
                            {product?.reviews && <Rating
                                readOnly
                                value={
                                    product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
                                }
                                fractions={2}
                            />}
                        </Box>
                        <Box w={'20%'}>
                            <Flex align={'center'} direction={'column'} justify={'space-evenly'} h={'100%'}>
                                <Flex>
                                    Market Price:&nbsp;
                                    <Text c={'black'} size="md" bg={slantLineThrough}>
                                        ₹ {product?.markedPrice}
                                    </Text>
                                </Flex>
                                <Flex>

                                    <Text component='div' c={'green.0'} size="lg" ta={'center'}>
                                        LazeyStore: ₹ {product?.salePrice}
                                    </Text>
                                </Flex>

                            </Flex>
                        </Box>


                    </Flex>
                </Box>
            ))
            }
        </ScrollArea>

    );
}

export default ProductListCards;
