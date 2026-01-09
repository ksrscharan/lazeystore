import { Box, Flex, Loader, Rating, ScrollArea, Text, TextInput, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ImageCarousel from './ImageCarousel';
import ProductDescription from './ProductDescription';
import { getNewAccessToken } from '../../redux/thunk/account';
import { fetchProductDetails } from '../../redux/thunk/products';
import { selectCurrentProduct } from '../../redux/selectors/productsSelector';
import DashboardCarousels from '../../components/carousel/DashboardCarousels';
import { BasicButton } from '../../components/buttons/Buttons';
import { IconUserFilled } from '@tabler/icons-react';
import Container from '../../components/container/Container';

function ProductDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const token = useSelector((state) => state.accessToken.token);
  const product = useSelector(selectCurrentProduct);

  const [userReview, setUserReview] = useState({
    ratings: 0,
    reviewTitle: "",
    reviewDescription: ""
  });

  useEffect(() => {
    dispatch(fetchProductDetails(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (token === null) {
      getNewAccessToken(dispatch);
    }
  }, [dispatch, token]);

  const handleReviewSubmit = async () => {
    if (userReview.ratings > 0 && userReview.reviewTitle.trim() !== "" && userReview.reviewDescription.trim() !== "") {
      try {
        const res = await axios.post('/api/reviews', {
          productId: product?._id,
          ...userReview
        });
        console.log('Review submitted:', res.data);
        setUserReview({ ratings: 0, reviewTitle: "", reviewDescription: "" });
      } catch (err) {
        console.error('Review submission failed:', err);
      }
    }
  };

  if (!product) {
    return (
      <Container>
        <Box h={'100%'} m={'auto'}>
          <Loader color="green.0" size="xl" type="dots" />
        </Box>
      </Container>
    );
  }

  return (
    <Container>

    <Flex direction="column" h="100%" style={{ overflow: 'hidden' }}>
      <ScrollArea
        type="hover"
        scrollbars="y"
        styles={{
          viewport: { overflowX: 'hidden' },
          scrollbar: { width: 8 },
        }}
      >
        <Box p={{ base: 'md', md: 'xl' }} pb="xl">
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: 'md', lg: 'xl' }}
            align={{ lg: 'flex-start' }}
          >
            <Box w={{ base: '100%', lg: '50%' }}>
              <ImageCarousel product={product} />
            </Box>

            <Box w={{ base: '100%', lg: '50%' }}>
              <ProductDescription product={product} />
            </Box>
          </Flex>

          <Box my="xl">
            <DashboardCarousels
              collectionKey="relatedCategory"
              carouselTitle={`Similar Products from ${product?.category} Category`}
              navigationPath={`/products/category/${product?.category}`}
            />
          </Box>

          <Box my="xl">
            <DashboardCarousels
              collectionKey="relatedSubCategory"
              carouselTitle={`Similar Products from ${product?.category} > ${product?.subCategory}`}
              navigationPath={`/products/category/${product?.category}/${product?.subCategory}`}
            />
          </Box>

          <Box my="xl" maw={700}>
            <Text fw={900} size="xl" mb="md">
              Write your Experience with {product?.title}
            </Text>

            <Flex align="center" gap="xs" mb="sm">
              <Text fw={500}>Rate your Experience:</Text>
              <Rating
                value={userReview.ratings}
                onChange={(val) => setUserReview({ ...userReview, ratings: val })}
                size="lg"
              />
              {userReview.ratings > 0 && (
                <Text size="sm" c="dimmed" ml="xs">
                  {['Very Bad', 'Bad', 'Average', 'Good', 'Very Good'][userReview.ratings - 1]} Product
                </Text>
              )}
            </Flex>

            <TextInput
              value={userReview.reviewTitle}
              onChange={(e) => setUserReview({ ...userReview, reviewTitle: e.currentTarget.value })}
              placeholder="Review Title"
              description="Your review will be visible to everyone. Use appropriate language."
              mb="md"
            />

            <Textarea
              value={userReview.reviewDescription}
              onChange={(e) => setUserReview({ ...userReview, reviewDescription: e.currentTarget.value })}
              placeholder={`Describe your Product Experience for ${product?.title}`}
              minRows={3}
              maxRows={6}
              mb="md"
            />

            <Flex align="center" justify="space-between">
              <Text size="xs" c="dimmed">
                *Abusive Language will result in Account Ban.
              </Text>
              <BasicButton
                onClick={handleReviewSubmit}
                disabled={
                  userReview.ratings === 0 ||
                  userReview.reviewTitle.trim() === "" ||
                  userReview.reviewDescription.trim() === ""
                }
              >
                Submit Review
              </BasicButton>
            </Flex>
          </Box>

          <Box my="xl">
            <Text fw={900} size="xl" mb="md">
              Top Reviews from Users who bought {product?.title}
            </Text>

            {product?.reviews?.length === 0 ? (
              <Text c="dimmed" ta="center">
                No User Reviews yet. Be the first!
              </Text>
            ) : (
              product.reviews.map((review, idx) => (
                <Box
                  key={idx}
                  p="md"
                  mb="md"
                  bd="1px solid var(--mantine-color-dark-4)"
                  style={{ borderRadius: 8 }}
                >
                  <Flex align="center" gap="sm" mb="xs">
                    <IconUserFilled size={20} />
                    <Text fw={500}>{review?.user || 'Anonymous'}</Text>
                  </Flex>

                  <Flex align="center" gap="xs" mb="xs">
                    <Text size="sm" fw={500}>Rating:</Text>
                    <Rating value={review.rating} readOnly size="sm" />
                  </Flex>

                  <Text size="sm" fs="italic" c="dimmed">
                    {review.review}
                  </Text>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </ScrollArea>
    </Flex>
    </Container>

  );
}

export default ProductDetails;