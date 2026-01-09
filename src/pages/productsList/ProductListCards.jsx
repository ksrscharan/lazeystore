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
                    w={{ xs: '90%', sm: '90%', md: '70%', lg: '100%', xl: '100%' }}
                    m={{ xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto', xl: 'auto' }}
                >
                    <Flex
                        gap={'sm'}
                        justify={'space-evenly'}
                        direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
                        m={{ xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto', xl: 'auto' }}
                        align={'center'}

                    >
                        <Image
                            src={product.imageUrl[0]}
                            fallbackSrc="https://placehold.co/100x100?text=No+Image"
                            // visibleFrom="lg"
                            h={{ xs: '300px', sm: '300px', md: '300px', lg: '100%', xl: '100%' }}
                            w={{ xs: '100%', sm: '100%', md: '300px', lg: '10%', xl: '10%' }}
                            loading='lazy'
                        />
                        <Box w={{ xs: '100%', sm: '100%', md: '100%', lg: '60%', xl: '60%' }}>
                            <Flex 
                            align={'center'}
                            justify={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}
                            >
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
                            <Text 
                            size="lg"
                            ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}
                            >
                                {product?.condition === "Refurbished" && "Refurbished - "}{product?.title} - {product?.subTitle}
                            </Text>
                            <Text 
                            c={'black'} 
                            size="xs"
                            ta={{ xs: 'center', sm: 'center', md: 'center', lg: 'left', xl: 'left' }}
                            >
                                {product?.description}
                            </Text>
                            {product?.reviews && <Rating
                                mx={{ xs: 'auto', sm: 'auto', md: 'auto', lg: 'inherit', xl: 'inherit' }}
                                readOnly
                                value={
                                    product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
                                }
                                fractions={2}
                            />}
                        </Box>
                        <Box w={{ xs: '100%', sm: '100%', md: '100%', lg: '20%', xl: '20%' }}>
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
