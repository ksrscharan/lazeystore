import './navbar.css';

import { Box, Flex, Group, Image, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '../../redux/reducers/themeSlice';
import { BasicButton } from '../buttons/Buttons';
import Link from '../links/Link';
import axios from 'axios';
import { setAccessToken } from "../../redux/reducers/accessTokenSlice"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Search from '../search/Search';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import lazeystoreImg from '../../assets/lazeystore.svg'

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const mode = useSelector((state) => state.theme.mode);
  const token = useSelector(state => state.accessToken.token)

  const handleLogout = () => {
    axios.post("http://localhost:3000/auth/logout", {}, {
      withCredentials: true,
    })
      .then((res) => {
        console.log("Logout successful:", res.data);

        dispatch(setAccessToken(null));

        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed or server error:", error.message);

        dispatch(setAccessToken(null));
        navigate("/login");
      });
  };

  return (
    <Flex miw={'100%'} direction={'column'} pos={'sticky'} top={0} style={{ zIndex: 3 }}>

      <Box bg={'white'} w={'100%'} color="black" bd={'2px solid green.0'}>
        <Flex
          align="center"
          className="navbar"
          direction="row"
          justify="space-between"
          p={'sm'}
        >
          <Image style={{ cursor: 'pointer' }} onClick={() => { navigate('/') }} src={lazeystoreImg} w={'150px'}/>
          {/* <Text size='1.5em' style={{ cursor: 'pointer' }} c="green.0" className="brandname" fw={900} tt="uppercase" onClick={() => { navigate('/') }}>
            LazeyStore
          </Text> */}
          <Box w={"60%"} visibleFrom='lg'>
            <Search />
          </Box>
          <Group>
            {token === null && <Link to={'/login'}>Log In</Link>}
            {(token !== null) && <BasicButton onClick={handleLogout}>Log Out</BasicButton>}

            <IconMoonStars display={mode == 'light' ? 'inherit' : 'none'} style={{ transition: 'display 0.5s linear', cursor: 'pointer' }} onClick={() => {
              dispatch(toggleTheme());
            }} />
            <IconSun display={mode == 'light' ? 'none' : 'inherit'} style={{ transition: 'display 0.5s linear', cursor: 'pointer' }} onClick={() => {
              dispatch(toggleTheme());
            }} />
          </Group>
        </Flex>
      </Box>
      <Box py={'sm'} miw={"100%"} display={{ xs: 'inherit', sm: 'inherit', md: 'inherit', lg: 'none', xl: 'none', }}>
        <Search />
      </Box>
    </Flex>
  );
}

export default Navbar;
