import { Box, CloseButton, Flex, Input, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SearchBox from './SearchBox';
import { selectProductsByCollection } from '../../redux/selectors/productsSelector';
import { fetchListedProducts, fetchNavigationData } from '../../redux/thunk/products';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(selectProductsByCollection("SearchItems"));

  useEffect(()=>{

    dispatch(fetchNavigationData())
  }, [])

  useEffect(() => {
    if(searchTerm.length>2)
    dispatch(fetchListedProducts({
      collectionKey: "SearchItems",
      endpoint: `${import.meta.env.VITE_API_BASE_URL}/products/search?searchTerm=${searchTerm}`,
      params: { limit: 20, sortBy: 'createdAt', sortOrder: 'asc', }
    }))
  }, [searchTerm])

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
            '&: Within': {
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
      {products && searchTerm.length >= 3 && (
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
          {products.length > 0 ? (

            <SearchBox
              filteredProducts={products}
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
