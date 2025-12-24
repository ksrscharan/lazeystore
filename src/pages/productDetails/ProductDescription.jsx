import { Badge, Box, Flex, Rating, Text, Tooltip } from '@mantine/core';
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

function ProductDescription({ product }) {
  const [wish, setWish] = useState()
  const [ratings, setRatings] = useState();
  useEffect(()=>{
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
          <OutlineButton>Add to Cart</OutlineButton>
          <Tooltip disabled={product?.available} label="Product Out of Stock">
            <BasicButton disabled={!product?.available} mx={'lg'}>
              Buy Now
            </BasicButton>
          </Tooltip>
          <Flex
            align={'center'}
            color="green.0"
            onClick={() => setWish(!wish)}
            style={{
              cursor: 'pointer'
            }}
          >
            {wish ? (
              <Tooltip label="Add to Wishlist">
                <IconStar style={{ outline: 'var(--mantine-color-green-0)' }} />
              </Tooltip>
            ) : (
              <Tooltip label="Remove from Wishlist">
                <IconStarFilled
                  style={{
                    fill: 'var(--mantine-color-green-0)',
                    outline: 'inherit',
                  }}
                />
              </Tooltip>
            )}
          </Flex>
        </Flex>

        <Box my={'lg'}>
          { }
          {/* <Text fw={100}> */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{` ### Product Description \n ${product.detailedDescription}`}</ReactMarkdown>
          {/* </Text> */}
        </Box>
      </Box>
    </>
  );
}

export default ProductDescription;
