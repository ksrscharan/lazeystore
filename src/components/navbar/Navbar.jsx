import './navbar.css';

import { Box, Flex, Group, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '../../redux/reducers/themeSlice';
import { BasicButton } from '../Buttons';
import Link from '../Link';

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Box color="black">
      <Flex
        align="center"
        className="navbar"
        direction="row"
        justify="space-between"
        p={'sm'}
      >
        <Text c="green.0" className="brandname" fw={900} tt="uppercase">
          LazeyStore
        </Text>
        <Group>
          <Text td="underline">
            <Link to={'/login'}>Login</Link>
          </Text>
          <BasicButton
            onClick={() => {
              dispatch(toggleTheme());
            }}
          >
            {mode == 'light' ? 'Light' : 'Dark'}
          </BasicButton>
        </Group>
      </Flex>
    </Box>
  );
}

export default Navbar;
