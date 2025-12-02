import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import { setProducts } from '../../redux/reducers/productsSlice'
import { Box, Card, Flex, Image, Text } from '@mantine/core';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '@mantine/carousel';
import elecBG from '../../assets/elecBG.png'
import welcomeImg from '../../assets/lazeystore-welcome.png'

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    axios.get('http://localhost:3000/products/get').then(res => {
      dispatch(setProducts(res.data))
    })
  }, [])

  return (
    <Flex gap={'xs'} direction={'column'}>
      <Navbar />
    <Flex style={{ flexGrow: 1 }} justify={'center'} align={'center'}>
          <Box h={'100%'}>
            <Image src={welcomeImg} h={'fit-content'} />
          </Box>
        </Flex>
      <Carousel
        slideSize={{ xs: '40%', sm: '40%', md: '40%', lg: '15%', xl: '15%' }}
        height={'100%'}
        slideGap="md"
        controlsOffset="xs"
        controlSize={27}
        withControls
        emblaOptions={{
          loop: true,
        }}
      >
        {products && products.map(product => (
          <Carousel.Slide>
            <Card onClick={() => { navigate(`/product/${product._id}`) }} p={0} >
              <Card.Section>
                <Image src={product.imageUrl[0]} />
              </Card.Section>
              <Box py={'sm'}>

                <Text size='xs'>{product.title}</Text>
                <Text size='xl'>₹ {product.price}</Text>
                <Text size='xs'>{product.description}</Text>
              </Box>
            </Card>
          </Carousel.Slide>
        )
        )}
      </Carousel>
      <Flex style={{ flexGrow: 1 }} justify={'center'} align={'center'}>
        <Box h={'100%'}>
          <Image src={elecBG} h={'fit-content'} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
