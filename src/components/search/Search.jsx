import { Box, CloseButton, Flex, Input, Text } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setProducts } from '../../redux/reducers/productsSlice';
import SearchBox from './searchBox';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/products/get').then((res) => {
      dispatch(setProducts(res.data));
    });
  }, []);
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = products.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  useEffect(() => {}, [filteredProducts]);

  return (
    <Box pos={'relative'} w={'100%'}>
      <Flex align={'center'} justify={'center'} w={'100%'}>
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for your favourite product here.."
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => setSearchTerm('')}
              style={{
                display: searchTerm ? undefined : 'none',
              }}
            />
          }
          rightSectionPointerEvents="all"
          style={{
            '&:focus-within': {
              outline: '2px solid var(--mantine-color-blue-5)',
            },
            outline: 'var(--mantine-color-green-0)',
          }}
          value={searchTerm}
          w={{
            xs: '90%',
            sm: '90%',
            md: '90%',
            lg: '60%',
            xl: '60%'
}}
        />
      </Flex>
      {filteredProducts && searchTerm.length >= 3 && (
        <Flex
          bd={'1px solid var(--mantine-color-green-0)'}
          bdrs={'sm'}
          bg={'white'}
          direction={'column'}
          h={'50vh'}
          justify={'flex-start'}
          left={{
            xs: '',
            sm: '',
            md: '',
            lg: 0,
            xl: 0
}}
          p="md"
          pos="absolute"
          style={{ overflow: 'hidden', scrollbarWidth: 'thin', zIndex: 3 }}
          top="100%"
          w={{
            xs: '100vw',
            sm: '100vw',
            md: '100vw',
            lg: '100%',
            xl: '100%'
}}
        >
          {}
          {filteredProducts.length > 0 ? (
            <SearchBox
              filteredProducts={filteredProducts}
              navigate={navigate}
              setSearchTerm={setSearchTerm}
            />
          ) : (
            searchTerm.length >= 3 && (
              <Text ta="center">{`No products found matching ${searchTerm}`}</Text>
            )
          )}
        </Flex>
      )}
    </Box>
  );
}

export default Search;
