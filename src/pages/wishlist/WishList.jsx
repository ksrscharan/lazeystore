import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container as MantineContainer, Flex } from '@mantine/core';

import { getNewAccessToken } from '../../redux/thunk/account';
import { getUser } from '../../redux/thunk/userProduct';
import WishlistProductList from '../../components/productsList/WishlistProductList';
import Container from '../../components/container/Container';

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.accessToken.token);
  const user = useSelector((state) => state.userDetails.user);

  useEffect(() => {
    if (!token) {
      getNewAccessToken(dispatch);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  const wishlistItems = user?.data?.wishlist || [];

  return (
    <Container>

      <WishlistProductList products={wishlistItems} navigate={navigate} />
    </Container>
  );
}

export default Wishlist;