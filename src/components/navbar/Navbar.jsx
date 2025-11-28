import './navbar.css';

import { Box, Flex, Group, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '../../redux/reducers/themeSlice';
import { BasicButton } from '../Buttons';
import Link from '../Link';
import axios from 'axios';
import {setAccessToken} from "../../redux/reducers/accessTokenSlice"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
          {token === null && <Link to={'/login'}>Log In</Link>}
          {(token !== null) && <BasicButton onClick={handleLogout}>Log Out</BasicButton>}
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
