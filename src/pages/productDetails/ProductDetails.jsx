import { Box, Flex, Rating, ScrollAreaAutosize, Text, Textarea, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import ImageCarousel from './ImageCarousel';
import ProductDescription from './ProductDescription';
import { getNewAccessToken } from '../../redux/thunk/account';
import { fetchProductDetails } from '../../redux/thunk/products';
import { selectCurrentProduct } from '../../redux/selectors/productsSelector';
import DashboardCarousels from '../../components/carousel/DashboardCarousels';
import { BasicButton } from '../../components/buttons/Buttons';
import { IconUserFilled } from '@tabler/icons-react';

function ProductDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const token = useSelector((state) => state.accessToken.token);
  const [userReview, setUserReview] = useState({
    ratings: 0,
    reviewTitle: "",
    reviewDescription: ""
  })
  const product = useSelector(selectCurrentProduct);
  useEffect(() => {
    dispatch(fetchProductDetails(slug));
  }, [slug]);
  useEffect(() => {
    if (token === null) {
      getNewAccessToken(dispatch);
    }
  }, [token, dispatch]);
  const handleReviewSubmit = async () => {
    if (userReview.ratings > 0 && userReview.reviewTitle !== "" && userReview.reviewDescription !== "") {
      const res = await axios.get();
    }
  }


  return (
    <Box h={'100vh'}>
      <Navbar />
    <Flex direction={'column'} mah={'90vh'} style={{overflow: 'hidden'}}>
      <ScrollAreaAutosize type='hover' offsetScrollbars>

        <Flex
          direction={{
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row'
          }}
          gap={'md'}
          h={'100%'}
          mih={'100%'}
          p={'xl'}
          style={{ flexGrow: 1 }}
          w={'100%'}
        >
          {product &&
            <ImageCarousel product={product} />
          }
          {product &&
            <ProductDescription product={product} />
          }
        </Flex>
        <DashboardCarousels collectionKey={"relatedCategory"} carouselTitle={`Similar Products from ${product?.category} Category`} navigationPath={`/products/category/${product?.category}`} />
        <DashboardCarousels collectionKey={"relatedSubCategory"} carouselTitle={`Similar Products from ${product?.category} > ${product?.subCategory}`} navigationPath={`/products/category/${product?.category}/${product?.subCategory}`} />
        <Flex m={'lg'} w={'50%'} direction={'column'} gap={'sm'}>
          <Text fw={900} size='xl'>{`Write your Experience with ${product?.title}`}</Text>
          <Flex>

            <Text>Rate your Experience: </Text><Rating onChange={(e) => {
              console.log(e)
              setUserReview({ ...userReview, ratings: e })
            }} />
            {userReview.ratings === 1 && <Text size='sm'>Very Bad Product</Text>}
            {userReview.ratings === 2 && <Text size='sm'>Bad Product</Text>}
            {userReview.ratings === 3 && <Text size='sm'>Average Product</Text>}
            {userReview.ratings === 4 && <Text size='sm'>Good Product</Text>}
            {userReview.ratings === 5 && <Text size='sm'>Very Good Product</Text>}
          </Flex>
          <TextInput
            onChange={(e) => {
              console.log(e.target.value)
              setUserReview({ ...userReview, reviewTitle: e.target.value })
              }}
              // label={`Write your Experience with ${product?.title}`}
              description="Your review will be visible to everyone. Use appropriate language."
            placeholder='Review Title'
          />
          <Textarea
            onChange={(e) => {
              console.log(e.target.value)
              setUserReview({ ...userReview, reviewDescription: e.target.value })
            }}
            placeholder={`Describe your Product Experience for ${product?.title}`}
            minRows={2}
            maxRows={4}
          />
          <Flex align={'center'} justify={'space-between'}>
            <Text size='xs'>*Abusive Language will result in Account Ban.</Text>
            <BasicButton onClick={handleReviewSubmit}>Submit Review</BasicButton>
          </Flex>
        </Flex>

        <Box>
          <Text m={'lg'} fw={900} size='xl'>Top Reviews from Users who bought {product?.title} </Text>
          {product?.reviews?.length == 0 ?
            <Text m={'lg'}>No User Reviews</Text> :
            product?.reviews?.map((review, idx) => (
              <Box m={'lg'} key={idx}>
                <Flex align={'center'} gap={'sm'} my={'md'}>

                <IconUserFilled />
                <Text h={'100%'} component='div'>{review?.user}</Text>
                </Flex>
                <Flex align={'center'}>

                  <Text component='span'>Rating: </Text> <Rating readOnly value={review.rating} />
                </Flex>
                Comment: <Text component='span' fs={'italic'}>{review.review}</Text>
              </Box>
            ))}
        </Box>
      </ScrollAreaAutosize>
    </Flex>
                </Box>
  );
}

export default ProductDetails;
