
import { Avatar, Box, Flex, Group, Image, Menu, Paper, Text } from '@mantine/core';
import { IconLogin2, IconLogout2, IconPackageExport, IconShoppingBagHeart, IconShoppingCart } from '@tabler/icons-react';
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
  useEffect(() => {

  }, [])
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
                <Avatar style={{ cursor: 'pointer' }} radius="xl" color='green.0' />
              </Menu.Target>
              <Menu.Dropdown w={'200px'}>
                <Paper shadow='lg' withBorder radius="md">
                  <Menu.Label ta={'center'}>Account</Menu.Label>
                  {token === null && <Menu.Item leftSection={<IconLogin2 />}><Link to={'/login'}>Log In</Link></Menu.Item>}
                  {token !== null && (
                    <>
                      <Menu.Item onClick={() => handleLogout(dispatch, navigate)} leftSection={<IconLogout2 />}><Text ta={'center'}>Log Out</Text></Menu.Item>
                      <Menu.Item onClick={() => navigate('/cart')} leftSection={<IconShoppingCart />}><Text ta={'center'} >Cart</Text></Menu.Item>
                      <Menu.Item onClick={() => navigate('/wishlist')} leftSection={<IconShoppingBagHeart />}><Text ta={'center'} >WishList</Text></Menu.Item>
                      <Menu.Item onClick={() => navigate('/orders')} leftSection={<IconPackageExport />}><Text ta={'center'} >Orders</Text></Menu.Item>
                    </>
                  )}
                </Paper>
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
