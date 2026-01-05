import { Badge, Box, Flex, Notification, Rating, Text, Tooltip } from '@mantine/core';
import {
  IconArrowBadgeRight,
  IconStar,
  IconStarFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { BasicButton, OutlineButton } from '../../components/buttons/Buttons';
import Link from '../../components/links/Link';
import { slantLineThrough } from '../../helpers/variables';
import { addToCart, addToWishlist, removeFromWishlist } from '../../redux/thunk/userProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProductDescription({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ratings, setRatings] = useState();
  const user = useSelector(state => state.userDetails.user)
  const [notify, setNotify] = useState(false)
  useEffect(() => {
    if (notify) {
      const timer = setTimeout(() => {
        setNotify(false)
      }, 3000)
    }
  })
  useEffect(() => {
    let rates = 0
    product?.reviews?.forEach(review => {
      rates += review.rating
    });
    setRatings(product?.reviews?.length > 0 ? rates / product.reviews.length : 0);
  }, [product])

  return (
    <>
      <Box
        w={{
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: '50%',
          xl: '50%'
        }}
      >
        <Text component="div" size="xl">
          {`${product?.title}`}
        </Text>
        <Text component="p" size="xs">{`${product?.subTitle} - ${product?.metaDescription}`}</Text>
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
            <Link to={`/products/category/${product?.category}`}>
              <Text c={'black'} fw={100} size="xs" ta={'center'}>
                {product?.category}
              </Text>
            </Link>
          </Badge>
          <IconArrowBadgeRight />
          <Badge
            color="black"
            size="xs"
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Text c={'green.0'} fw={100} size="xs" ta={'center'}>
              {product?.subCategory}
            </Text>
          </Badge>
        </Flex>
        <Text component="span" fw={900} pr={'sm'} size="xl" bg={slantLineThrough}>
          &#8377;&nbsp;{product?.markedPrice}
        </Text>
        <Text c={'green.0'} component="span" fw={900} size="xl">
          &#8377;&nbsp;{product?.salePrice} Only
        </Text>
        {product?.available ? (
          <Text>
            {product?.availableCount < 10 && 'Only'} {product.availableCount}{' '}
            Items Available
          </Text>
        ) : (
          <Text td={'underline'}>Out Of Stock</Text>
        )}
        <Flex>

          <Rating value={ratings} fractions={2} readOnly /> &nbsp;&nbsp;
          <Text>{product && product?.reviews?.length} Reviews</Text>
        </Flex>
        <Flex justify={'flex-end'} mx={'xl'} my={'xl'}>
          <OutlineButton onClick={() => {
            dispatch(addToCart(product))
            if (user) {
              const isInCart = user?.data?.cart?.some(
                (item) => item.productId?._id === product._id
              );
              console.log(isInCart);
              setNotify(true)
            }
          }
          }>Add to Cart</OutlineButton>
          <Tooltip disabled={product?.available} label="Product Out of Stock">
            <BasicButton disabled={!product?.available} mx={'lg'}>
              Buy Now
            </BasicButton>
          </Tooltip>
          <Flex
            align={'center'}
            color="green.0"
            style={{
              cursor: 'pointer'
            }}
          >
            {isWishlisted ? (
              <Tooltip label="Remove From Wishlist">
                {/* <OutlineButton > */}
                <IconStarFilled
                  style={{ outline: 'var(--mantine-color-green-0)' }}
                  onClick={() => {
                    dispatch(removeFromWishlist(product))
                    setIsWishlisted(false)
                  }}
                />
                {/* </OutlineButton> */}
              </Tooltip>
            ) : (
              <Tooltip label="Add To Wishlist">
                {/* <OutlineButton> */}
                <IconStar
                  style={{
                    outline: 'inherit',
                  }}
                  onClick={() => {
                    dispatch(addToWishlist(product))
                    setIsWishlisted(true)
                  }
                  }
                />
                {/* </OutlineButton> */}

              </Tooltip>
            )}
          </Flex>
        </Flex>

        <Box my={'lg'}>
          { }
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{` ### Product Description \n ${product.detailedDescription}`}</ReactMarkdown>
        </Box>
      </Box >
      {notify && <Notification bd={'3px solid green.0'} color='green.0' pos={'absolute'} right={'2vw'} style={{ zIndex: 100 }} onClose={() => setNotify(false)}>
        <Text c={'green.0'} size='lg'>Item Added to your Cart</Text>
        <Text size='sm'>
          {product?.title} is Added to your Cart. Check out now.
        </Text>
        <OutlineButton onClick={() => {
          setNotify(false)
          navigate('/cart')
        }} my={'sm'}>Visit Cart</OutlineButton>
      </Notification>
      }
    </>
  );
}

export default ProductDescription;
