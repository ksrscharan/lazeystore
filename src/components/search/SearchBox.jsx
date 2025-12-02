import { Badge, Box, Flex, Image, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight } from '@tabler/icons-react';
import React from 'react'

function SearchBox({ filteredProducts, navigate, setSearchTerm }) {
    return (
        <>
            <Text m={0}>Results: </Text>
            <ScrollArea offsetScrollbars type="scroll" style={{ zIndex: 4 }}>

                {filteredProducts.map(product => (
                    <Box bd={'1px solid var(--mantine-color-green-0)'} bdrs={'md'} my={'sm'} p={'sm'} key={product.id} w={'100%'} style={{ zIndex: 5, cursor: 'pointer' }} onClick={() => { navigate(`/product/${product._id}`); setSearchTerm("") }} >
                        <Flex justify={'space-between'}>
                            <Box>
                                <Flex align={'center'}>
                                    <Badge style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size='xs' color='green.0'><Text ta={'center'} fw={100} size='xs' c={'black'}>{product.category}</Text></Badge> <IconArrowBadgeRight /> <Badge style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size='xs' color='black'><Text ta={'center'} fw={100} size='xs' c={'white'}>{product.subCategory}</Text></Badge>
                                </Flex>
                                <Text size='lg'>{product.title} - {product.subTitle}</Text>
                                <Text c={'black'} size='xs'>{product.description}</Text>
                            </Box>
                            <Image visibleFrom='lg' w={'10%'} src={product.imageUrl[0]}></Image>
                        </Flex>
                    </Box>
                ))}
            </ScrollArea>
        </>
    )
}

export default SearchBox
