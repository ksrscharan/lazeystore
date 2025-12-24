
import { Avatar, Box, Flex, Group, Image, Menu, Text } from '@mantine/core';
import { IconLogin2, IconLogout2, IconShoppingBagHeart, IconShoppingCart } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import lazeystoreImg from '../../assets/lazeystore.svg';
import Link from '../links/Link';
import Search from '../search/Search';
import { useEffect } from 'react';
import { handleLogout } from '../../redux/thunk/account'
import NavMenu from './NavMenu';
import ColorToggle from './ColorToggle';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.accessToken.token);

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
          { }
          <Box visibleFrom="lg" w={'60%'}>
            <Search />
          </Box>
          <Group>
            
            <NavMenu />
            
            <ColorToggle />
            <Menu>
              <Menu.Target>
                <Avatar radius="xl" color='green.0' />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                {token === null && <Menu.Item leftSection={<IconLogin2 />}><Link to={'/login'}>Log In</Link></Menu.Item>}
                {token !== null && (
                  <>
                    <Menu.Item leftSection={<IconLogout2 />}><Text onClick={() => handleLogout(dispatch, navigate)}>Log Out</Text></Menu.Item>
                    <Menu.Item leftSection={<IconShoppingCart />}><Text >Cart</Text></Menu.Item>
                    <Menu.Item leftSection={<IconShoppingBagHeart />}><Text >WishList</Text></Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>


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
