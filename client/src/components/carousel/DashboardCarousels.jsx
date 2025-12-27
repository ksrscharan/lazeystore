import { Box, Card, Flex, Image, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useNavigate } from 'react-router-dom';

import { OutlineButton } from '../buttons/Buttons';
import CarouselCard from '../cards/CarouselCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListedProducts, fetchNavigationData } from '../../redux/thunk/products';
import { selectProductsByCollection } from '../../redux/selectors/productsSelector';

function DashboardCarousels({ carouselTitle, navigationPath, collectionKey, endpoint, params }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector(selectProductsByCollection(collectionKey));

    useEffect(() => {
        dispatch(fetchNavigationData())
        dispatch(fetchListedProducts({
            collectionKey: collectionKey,
            endpoint: endpoint,
            params: params || { limit: 10, sortBy: 'createdAt', sortOrder: 'asc', }
        }))

    }, [])


    return (
        <Box>
            <Flex justify={'space-between'} p={'sm'}>
                <Text>
                    {carouselTitle}
                </Text>
                <OutlineButton rightSection={<IconArrowNarrowRight />} onClick={() => navigate(`${navigationPath}`)}>View All </OutlineButton>
            </Flex>
            <Carousel
                px={'sm'}
                controlSize={27}
                controlsOffset="xs"
                emblaOptions={{
                    loop: true,
                }}
                height={'100%'}
                slideGap="md"
                slideSize={{
                    xs: '40%',
                    sm: '40%',
                    md: '40%',
                    lg: '15%',
                    xl: '15%'
                }}
                withControls
            >
                {
                    products?.map((product) => (
                        <Carousel.Slide key={product._id}>
                            <CarouselCard product={product} />
                        </Carousel.Slide>
                    ))}
            </Carousel>
        </Box>
    )
}

export default DashboardCarousels