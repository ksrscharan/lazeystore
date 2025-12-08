import { Carousel } from '@mantine/carousel';
import { Box, Card, Flex, Image, ScrollArea, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import elecBG from '../../assets/elecBG.webp';
import welcomeImg from '../../assets/lazeystore-welcome.webp';
import Navbar from '../../components/navbar/Navbar';
import { setProducts } from '../../redux/reducers/productsSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    axios.get('http://localhost:3000/products/get').then((res) => {
      dispatch(setProducts(res.data));
    });
  }, []);

  return (
    <Flex direction={'column'} gap={'xs'}>
      <Navbar />

      <Flex align={'center'} justify={'center'} style={{ flexGrow: 1 }}>
        <Box h={'100%'}>
          <Image loading='lazy' h={'fit-content'} src={welcomeImg} />
        </Box>
      </Flex>
      <Carousel
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
        {products &&
          products.map((product) => (
            <Carousel.Slide key={product._id}>
              <Card
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
                p={0}
              >
                <Card.Section>
                  <Image loading='lazy' src={product.imageUrl[0]} />
                </Card.Section>
                <Box py={'sm'}>
                  <Text size="xs">{product.title}</Text>
                  <Text size="xl">₹ {product.price}</Text>
                  <Text size="xs">{product.description}</Text>
                </Box>
              </Card>
            </Carousel.Slide>
          ))}
      </Carousel>
      <Flex align={'center'} justify={'center'} style={{ flexGrow: 1 }}>
        <Box h={'100%'}>
          <Image loading='lazy' h={'fit-content'} src={elecBG} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
