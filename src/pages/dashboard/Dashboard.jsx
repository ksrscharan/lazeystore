import { Box, Flex, Image, ScrollArea, ScrollAreaAutosize } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import elecBG from '../../assets/elecBG.webp';
import welcomeImg from '../../assets/lazeystore-welcome.webp';
import Navbar from '../../components/navbar/Navbar';
import DashboardCarousels from '../../components/carousel/DashboardCarousels';
import { fetchNavigationData } from '../../redux/thunk/products';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.products.categories)
  // const subCategories = useSelector(state => state.products.subCategories)



  useEffect(() => {
    dispatch(fetchNavigationData())
  }, []);

  return (
    <Box h={'100vh'} style={{ overflow: 'hidden' }}>
      <Navbar />

      <Flex direction={'column'} gap={'xs'} h={'100%'} style={{ overflow: 'hidden' }}>
        <ScrollArea type='hover' offsetScrollbars>

          <Flex align={'center'} justify={'center'} style={{ flexGrow: 1 }}>
            <Box h={'100%'}>
              <Image loading='lazy' h={'fit-content'} src={welcomeImg} />
            </Box>
          </Flex>
          <DashboardCarousels carouselTitle={'Top Deals for You!'} navigationPath={'/products?page=1&limit=10&sortBy=createdAt&sortOrder=desc'} collectionKey={"All"} endpoint={'http://localhost:3000/products/get'} />

          {
            categories.map((category, idx) => {
              return (
                <DashboardCarousels key={idx} carouselTitle={`Best Products from ${category}!`} navigationPath={`/products/category/${category}`} collectionKey={category} endpoint={`http://localhost:3000/products/category/${category}`} />

              )
            })
          }
          <Flex align={'center'} justify={'center'} style={{ flexGrow: 1 }}>
            <Box h={'100%'}>
              <Image loading='lazy' h={'fit-content'} src={elecBG} onClick={() => navigate('/products/category/Electronics')} />
            </Box>
          </Flex>

        </ScrollArea>
      </Flex>
    </Box>
  );
}

export default Dashboard;
