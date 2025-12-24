import { Badge, Box, Card, Image, Text } from '@mantine/core';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function CarouselCard({ product }) {
    const navigate = useNavigate();
    return (
        <Card
            style={{cursor: 'pointer'}}
            onClick={() => {
                navigate(`/product/${product.slug}`);
            }}
            p={0}
        >
            <Card.Section>
            <Badge pos={'absolute'} top={0} mx={'md'}><Text size='xs'>{Math.round(100 - (product.salePrice / product.markedPrice * 100))}% Off</Text></Badge>
                <Image loading='lazy' src={product.imageUrl[0]} />
                {/* <Image loading='lazy' src={"https://images.pexels.com/photos/221185/pexels-photo-221185.jpeg"} /> */}
            </Card.Section>
            <Box py={'sm'}>
                <Text size="xs">{product.title}</Text>
                <Text size="md">₹ {product.salePrice}</Text>
                <Text size="xs">{product.description}</Text>
            </Box>
        </Card>
    )
}

export default CarouselCard