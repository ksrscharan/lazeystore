import { Badge, Box, Flex, Text, Tooltip } from '@mantine/core'
import { IconArrowBadgeRight, IconStar, IconStarFilled } from '@tabler/icons-react'
import ReactMarkdown from 'react-markdown'

import { BasicButton, OutlineButton } from '../../components/buttons/Buttons'
import Link from '../../components/links/Link'

function ProductDescription({ product }) {
    return (
        <>
            <Box
                w={{
                    xs: '100%',
                    sm: '100%',
                    md: '100%',
                    lg: '50%',
                    xl: '50%'
                }}
            >
                <Text
                    component='div'
                    size='xl'
                >
                    {`${product.title}`}
                </Text>
                <Text component='p' size='xs'>{`${product.subTitle}`}</Text>
                <Flex align={'center'}>
                    <Badge
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        size='xs'
                        color='green.0'
                    >
                        <Link
                            to={`/products/category/${product.category}`}
                        >
                            <Text
                                ta={'center'}
                                fw={100}
                                size='xs'
                                c={'black'}>
                                {product.category}
                            </Text>
                        </Link>
                    </Badge>
                    <IconArrowBadgeRight />
                    <Badge
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        size='xs'
                        color='black'>
                        <Text
                            ta={'center'}
                            fw={100}
                            size='xs'
                            c={'green.0'}>
                            {product.subCategory}
                        </Text>
                    </Badge>
                </Flex>
                <Text
                    pr={'sm'}
                    component='span'
                    size='xl'
                    td="line-through"
                    fw={900}
                >
                    &#8377;&nbsp;{product.price * 1.2}
                </Text>
                <Text
                    component='span'
                    size='xl' c={'green.0'}
                    fw={900}
                >
                    &#8377;&nbsp;{product.price} Only
                </Text>
                {product.available ?
                    <Text>
                        {product.availableCount < 10 && "Only"} {product.availableCount} Items Available
                    </Text>
                    :
                    <Text
                        td={'underline'}
                    >
                        Out Of Stock
                    </Text>}
                <Flex
                    mx={'xl'}
                    my={'xl'}
                    justify={'flex-end'}
                >
                    <OutlineButton>
                        Add to Cart
                    </OutlineButton>
                    <Tooltip
                        disabled={product.available}
                        label='Product Out of Stock'
                    >
                        <BasicButton
                            mx={'lg'}
                            disabled={!product.available}>
                            Buy Now
                        </BasicButton>
                    </Tooltip>
                    <Flex
                        color='green.0'
                        style={{ cursor: 'pointer' }}
                        align={'center'}
                        onClick={() => setWish(!wish)}
                    >
                        {wish ?
                            <Tooltip
                                label="Add to Wishlist"
                            >
                                <IconStar style={{ outline: 'var(--mantine-color-green-0)' }} />
                            </Tooltip> :
                            <Tooltip
                                label="Remove from Wishlist"
                            >
                                <IconStarFilled style={{ outline: 'inherit', fill: 'var(--mantine-color-green-0)' }} />
                            </Tooltip>}
                    </Flex>
                </Flex>

                <Box
                    my={'lg'}
                >

                    {/* <Text fw={900} size='xl'>Product Description: </Text> */}
                    <Text
                        fw={100}
                    >
                        <ReactMarkdown>{ }</ReactMarkdown>
                    </Text>
                </Box>

            </Box>
        </>
    )
}

export default ProductDescription