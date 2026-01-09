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
    <Box pos="relative" w="100%">
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for your favourite product here.."
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setSearchTerm('')}
            style={{ display: searchTerm ? undefined : 'none' }}
          />
        }
        rightSectionPointerEvents="all"
        value={searchTerm}
        size="md" // better touch target on mobile
        styles={{
          input: {
            borderColor: 'var(--mantine-color-green-0)',
            '&:focus': {
              outline: '2px solid var(--mantine-color-blue-5)',
              borderColor: 'var(--mantine-color-green-0)',
            },
          },
        }}
      />

      {/* Dropdown results */}
      {products && searchTerm.length >= 3 && (
        <Box
          pos="absolute"
          top="calc(100% + 4px)" // small gap below input
          left={0}
          right={0}
          mt="xs"
          bd="1px solid var(--mantine-color-green-0)"
          bdrs="md"
          bg="var(--mantine-color-body)"
          style={{
            maxHeight: '60vh',
            overflowY: 'auto',
            zIndex: 1001,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {products.length > 0 ? (
            <SearchBox
              filteredProducts={products}
              navigate={navigate}
              setSearchTerm={setSearchTerm}
            />
          ) : (
            <Text ta="center" p="md" c="dimmed">
              No products found matching "{searchTerm}"
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Search;
