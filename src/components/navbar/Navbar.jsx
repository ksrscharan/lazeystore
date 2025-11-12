import { Button, Group, Flex, Text, Container, Box } from '@mantine/core';
import './navbar.css';
import { BasicButton, GradientButton, OutlineButton } from '../Buttons';
import { toggleTheme } from '../../redux/reducers/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Box color="black">
      <Flex
        className="navbar"
        justify="space-between"
        align="center"
        direction="row"
        p={'sm'}
      >
        <Text c="green.0" className="brandname" tt="uppercase" fw={900}>
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
