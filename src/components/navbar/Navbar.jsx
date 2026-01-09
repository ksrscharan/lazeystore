import { Avatar, Box, Flex, Group, Image, Menu, Paper, Text } from '@mantine/core';
import { IconLogin2, IconLogout2, IconPackageExport, IconShoppingBagHeart, IconShoppingCart } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import lazeystoreImg from '../../assets/lazeystore.svg';
import Link from '../links/Link';
import Search from '../search/Search';
import { handleLogout } from '../../redux/thunk/account';
import NavMenu from './NavMenu';
import ColorToggle from './ColorToggle';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.accessToken.token);

  return (
    <Box
      pos="sticky"
      top={0}
      w="100%"
      style={{ zIndex: 5 }}
      bg="var(--mantine-color-body)"
      bd="2px solid var(--mantine-color-green-0)"
      h={{
        xs: '18vh',
        sm: '18vh',
        md: '13vh',
        lg: '8vh',
        xl: '8vh',
      }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        p={{ base: 'xs', md: 'sm' }}
        gap={{ base: 'md', md: 0 }}
      >
        <Image
          src={lazeystoreImg}
          fallbackSrc="https://placehold.co/100x100?text=No+Image"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          w={{ base: '140px', md: '150px' }}
          loading="lazy"
        />

        <Box visibleFrom="lg" w={{ lg: '50%', xl: '60%' }}>
          <Search />
        </Box>

        <Group
          spacing={{ base: 'xs', md: 'sm' }}
          justify={{ base: 'center', md: 'flex-end' }}
        >
          <NavMenu />
          <ColorToggle />

          <Menu>
            <Menu.Target>
              <Avatar style={{ cursor: 'pointer' }} radius="xl" color="green.0" />
            </Menu.Target>
            <Menu.Dropdown w={220}>
              <Paper shadow="lg" withBorder radius="md">
                <Menu.Label ta="center">Account</Menu.Label>
                {token === null ? (
                  <Menu.Item leftSection={<IconLogin2 />}>
                    <Link to="/login">Log In</Link>
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item
                      onClick={() => handleLogout(dispatch, navigate)}
                      leftSection={<IconLogout2 />}
                    >
                      <Text ta="center">Log Out</Text>
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/cart')} leftSection={<IconShoppingCart />}>
                      <Text ta="center">Cart</Text>
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/wishlist')} leftSection={<IconShoppingBagHeart />}>
                      <Text ta="center">Wishlist</Text>
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/orders')} leftSection={<IconPackageExport />}>
                      <Text ta="center">Orders</Text>
                    </Menu.Item>
                  </>
                )}
              </Paper>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>

      <Box hiddenFrom="lg" px="sm" pb="sm" bg="var(--mantine-color-body)">
        <Search />
      </Box>
    </Box>
  );
}

export default Navbar;