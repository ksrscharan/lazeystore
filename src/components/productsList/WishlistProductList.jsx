import { Badge, Box, Flex, Image, Rating, ScrollArea, Text } from '@mantine/core';
import { IconArrowBadgeRight } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { OutlineButton } from '../buttons/Buttons';
import EmptyWishlist from '../emptyPages/EmptyWishlist';
import { removeFromWishlist } from '../../redux/thunk/userProduct';

function WishlistProductList({ products, navigate }) {
  const dispatch = useDispatch();

  return (
    <>
      {products?.length < 1 ? (
        <EmptyWishlist />
      ) : (
        <Flex direction="column" h="100%" style={{ overflow: 'hidden' }}>
          <ScrollArea type="hover" w="100%">
            {products?.map((product) => (
              <Box
                bd="1px solid var(--mantine-color-green-0)"
                bdrs="md"
                key={product.productId?._id}
                my="sm"
                mx={'auto'}
                p="sm"
                style={{ zIndex: 5 }}
                w={{ xs: '90%', sm: '90%', md: '90%', lg: '70%', xl: '70%' }}
              >
                <Flex
                  gap="md"
                  justify="space-between"
                  align="center"
                  wrap="wrap"
                  direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
                >
                  <Image
                    src={product.productId?.imageUrl?.[0]}
                    fallbackSrc="https://placehold.co/100x100?text=No+Image"
                    radius="md"
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                    w={{ xs: '100%', sm: '100%', md: '100px', lg: '80px', xl: '80px' }}
                  />

                  <Box
                    w={{ xs: '100%', sm: '100%', md: '60%', lg: '60%', xl: '60%' }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${product.productId?.slug}`)}
                  >
                    <Flex align="center" justify={{ base: 'center', lg: 'flex-start' }} mb="xs">
                      <Badge color="green.0" size="xs">
                        <Text c="black" fw={100} size="xs" ta="center">
                          {product.productId?.category}
                        </Text>
                      </Badge>
                      <IconArrowBadgeRight size={16} />
                      <Badge color="black" size="xs">
                        <Text c="white" fw={100} size="xs" ta="center">
                          {product.productId?.subCategory}
                        </Text>
                      </Badge>
                    </Flex>

                    <Text
                      size="lg"
                      ta={{ base: 'center', lg: 'left' }}
                      fw={500}
                    >
                      {product.productId?.condition === 'Refurbished' && 'Refurbished - '}
                      {product.productId?.title} - {product.productId?.subTitle}
                    </Text>

                    <Text
                      c="dimmed"
                      size="sm"
                      ta={{ base: 'center', lg: 'left' }}
                      lineClamp={2}
                    >
                      {product.productId?.description}
                    </Text>

                    {product.productId?.reviews?.length > 0 && (
                      <Rating
                        mx={{ base: 'auto', lg: 0 }}
                        readOnly
                        value={
                          product.productId.reviews.reduce((acc, review) => acc + review.rating, 0) /
                          product.productId.reviews.length
                        }
                        fractions={2}
                        size="sm"
                      />
                    )}
                  </Box>

                  <Box
                    w={{ xs: '100%', sm: '100%', md: '20%', lg: '20%', xl: '20%' }}
                    ta={{ base: 'center', lg: 'left' }}
                  >
                    <Flex
                      direction="column"
                      align={{ base: 'center', lg: 'flex-start' }}
                      gap="xs"
                    >
                      <Text size="sm" c="dimmed">
                        Market Price:{' '}
                        <Text component="span" td="line-through" size="md">
                          ₹{product.productId?.markedPrice}
                        </Text>
                      </Text>

                      <Text fw={700} size="xl" c="green.0">
                        LazeyStore: ₹{product.productId?.salePrice}
                      </Text>
                    </Flex>
                  </Box>

                  <Box
                    w={{ xs: '100%', sm: '100%', md: '60%', lg: '10%', xl: '10%' }}
                  >
                    <Flex justify="center" align="center" h="100%">
                      <OutlineButton
                        //   w={{ base: '100%', lg: 'auto' }}
                        //   size={{ base: 'md', lg: 'sm' }}
                        onClick={() => dispatch(removeFromWishlist(product?.productId))}
                      >
                        Remove
                      </OutlineButton>
                    </Flex>
                  </Box>

                </Flex>
              </Box>
            ))}
          </ScrollArea>
        </Flex>
      )}
    </>
  );
}

export default WishlistProductList;