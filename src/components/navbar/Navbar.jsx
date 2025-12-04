import './navbar.css';

import { Box, Flex, Group, Image } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import lazeystoreImg from '../../assets/lazeystore.svg';
import { setAccessToken } from '../../redux/reducers/accessTokenSlice';
import { toggleTheme } from '../../redux/reducers/themeSlice';
import { BasicButton } from '../buttons/Buttons';
import Link from '../links/Link';
import Search from '../search/Search';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const token = useSelector((state) => state.accessToken.token);

  const handleLogout = () => {
    axios
      .post(
        'http://localhost:3000/auth/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log('Logout successful:', res.data);

        dispatch(setAccessToken(null));

        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed or server error:', error.message);

        dispatch(setAccessToken(null));
        navigate('/login');
      });
  };

  return (
    <Flex
      direction={'column'}
      miw={'100%'}
      pos={'sticky'}
      style={{ zIndex: 3 }}
      top={0}
    >
      <Box bd={'2px solid green.0'} bg={'white'} color="black" w={'100%'}>
        <Flex
          align="center"
          className="navbar"
          direction="row"
          justify="space-between"
          p={'sm'}
        >
          <Image
            onClick={() => {
              navigate('/');
            }}
            src={lazeystoreImg}
            style={{ cursor: 'pointer' }}
            w={'150px'}
            loading='lazy' 
          />
          {}
          <Box visibleFrom="lg" w={'60%'}>
            <Search />
          </Box>
          <Group>
            {token === null && <Link to={'/login'}>Log In</Link>}
            {token !== null && (
              <BasicButton onClick={handleLogout}>Log Out</BasicButton>
            )}

            <IconMoonStars
              display={mode == 'light' ? 'inherit' : 'none'}
              onClick={() => {
                dispatch(toggleTheme());
              }}
              style={{ cursor: 'pointer', transition: 'display 0.5s linear' }}
            />
            <IconSun
              display={mode == 'light' ? 'none' : 'inherit'}
              onClick={() => {
                dispatch(toggleTheme());
              }}
              style={{ cursor: 'pointer', transition: 'display 0.5s linear' }}
            />
          </Group>
        </Flex>
      </Box>
      <Box
        display={{
          xs: 'inherit',
          sm: 'inherit',
          md: 'inherit',
          lg: 'none',
          xl: 'none'
}}
        miw={'100%'}
        py={'sm'}
      >
        <Search />
      </Box>
    </Flex>
  );
}

export default Navbar;
