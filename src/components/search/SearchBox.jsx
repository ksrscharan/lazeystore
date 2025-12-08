import { Badge, Box, Flex, Image, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight } from '@tabler/icons-react';

function SearchBox({ filteredProducts, navigate, setSearchTerm }) {
  return (
    <>
      <Text m={0}>Results: </Text>
      <ScrollArea offsetScrollbars style={{ zIndex: 4 }} type="scroll">
        {filteredProducts.map((product) => (
          <Box
            bd={'1px solid var(--mantine-color-green-0)'}
            bdrs={'md'}
            key={product.id}
            my={'sm'}
            onClick={() => {
              navigate(`/product/${product._id}`);
              setSearchTerm('');
            }}
            p={'sm'}
            style={{ cursor: 'pointer', zIndex: 5 }}
            w={'100%'}
          >
            <Flex justify={'space-between'}>
              <Box>
                <Flex align={'center'}>
                  <Badge
                    color="green.0"
                    size="xs"
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Text c={'black'} fw={100} size="xs" ta={'center'}>
                      {product.category}
                    </Text>
                  </Badge>{' '}
                  <IconArrowBadgeRight />{' '}
                  <Badge
                    color="black"
                    size="xs"
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Text c={'white'} fw={100} size="xs" ta={'center'}>
                      {product.subCategory}
                    </Text>
                  </Badge>
                </Flex>
                <Text size="lg">
                  {product.title} - {product.subTitle}
                </Text>
                <Text c={'black'} size="xs">
                  {product.description}
                </Text>
              </Box>
              <Image
                src={product.imageUrl[0]}
                visibleFrom="lg"
                w={'10%'}
                loading='lazy' 
              ></Image>
            </Flex>
          </Box>
        ))}
      </ScrollArea>
    </>
  );
}

export default SearchBox;
