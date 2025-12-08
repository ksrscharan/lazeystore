import { Flex } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Navbar from '../../components/navbar/Navbar';
import { setAccessToken } from '../../redux/reducers/accessTokenSlice';
import { setProducts } from '../../redux/reducers/productsSlice';
import ImageCarousel from './ImageCarousel';
import ProductDescription from './ProductDescription';

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const token = useSelector((state) => state.accessToken.token);
  const { products } = useSelector((state) => state.products);
  const [wish, setWish] = useState(false);
  const navigate = useNavigate();

  const getNewAccessToken = () => {
    axios
      .get('http://localhost:3000/auth/createAccessToken', {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setAccessToken(res.data.accessToken));
        navigate('/');
      })
      .catch((e) => {
        console.log('Silent refresh failed:', e.message);
      });
  };

  useEffect(() => {
    axios.get('http://localhost:3000/products/get').then((res) => {
      dispatch(setProducts(res.data));
      setProduct(res.data.filter((product) => product._id === id)[0]);
    });
  }, [id]);

  useEffect(() => {
    if (token === null) {
      getNewAccessToken();
    }
  }, [token]);

  return (
    <Flex direction={'column'} mih={'100vh'}>
      <Navbar />
      {product && (
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
          <ImageCarousel product={product} />
          <ProductDescription product={product} />
        </Flex>
      )}
    </Flex>
  );
}

export default ProductDetails;
