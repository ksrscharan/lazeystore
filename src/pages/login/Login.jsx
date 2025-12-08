import { Box, Flex, Input, PasswordInput, Text } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import bakImage from '../../assets/loginbg.png';
import { BasicButton } from '../../components/buttons/Buttons';
import Link from '../../components/links/Link';
import Navbar from '../../components/navbar/Navbar';
import { setAccessToken } from '../../redux/reducers/accessTokenSlice';
import { setEmail, setPassword } from '../../redux/reducers/loginFormSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.loginForm);
  const [loginError, setLoginError] = useState('');
  const token = useSelector((state) => state.accessToken.token);
  const [mailValid, setMailValid] = useState(true);

  const emailIsValid = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleSubmit = (email, password) => {
    axios
      .post(
        'http://localhost:3000/auth/login',
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setAccessToken(res.data.accessToken));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
        navigate('/');
      })
      .catch((e) => {
        console.error('Login failed:', e.response.data.message || e.message);
        setLoginError(e.response.data.message);
      });
  };

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
    getNewAccessToken();
  }, []);

  return (
    <>
      <Flex direction={'column'} mih={'100vh'}>
        <Navbar />
        <Flex
          direction={{
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row'
}}
          gutter={0}
          style={{ flexGrow: 1 }}
        >
          <Box
            bg={'green.0'}
            mih={{
              xs: '200px',
              sm: '200px',
              md: '100%',
              lg: '',
              xl: ''
}}
            style={{
              backgroundImage: `url(${bakImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            w={{
              xs: '100%',
              sm: '100%',
              md: '50%',
              lg: '40%',
              xl: '40%'
}}
          >
            <Flex
              align="center"
              direction="column"
              justify="center"
              mih={{
                xs: '200px',
                sm: '200px',
                md: '100%',
                lg: '',
                xl: ''
}}
              p="xl"
              style={{
                backgroundImage: `url(${bakImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              <Text component="div" fw={700} size="xl" ta={'center'}>
                Glad You&apos;re Back!
              </Text>
              <Text fw={500} size="lg" ta={'center'}>
                Your shopping cart misses you. Log in quickly to pick up where
                you left off!
              </Text>
            </Flex>
          </Box>

          <Flex
            align={'center'}
            className="login-box2"
            justify={'center'}
            mih={{
              xs: '',
              sm: '',
              md: '100%',
              lg: '',
              xl: ''
}}
            p={{
              xs: 'lg',
              sm: '',
              md: 'none',
              lg: '',
              xl: ''
}}
            w={{
              xs: '100%',
              sm: '100%',
              md: '50%',
              lg: '60%',
              xl: '60%'
}}
          >
            <Box
              mih={'30%'}
              w={{
                xs: '90%',
                sm: '60%',
                md: '70%',
                lg: '',
                xl: '40%'
}}
            >
              <Flex direction={'column'} h={'100%'} justify={'space-evenly'}>
                <Flex direction={'column'} gap={'lg'}>
                  <Input.Wrapper label="E-mail" required>
                    <Input
                      error={loginError || !mailValid}
                      onBlur={() => {
                        setMailValid(emailIsValid(email));
                      }}
                      onChange={(e) => {
                        dispatch(setEmail(e.target.value));
                        setLoginError(false);
                      }}
                      onFocus={() => {
                        setMailValid(true);
                      }}
                      placeholder="Email Here"
                      rightSection={
                        !mailValid ? <IconExclamationCircle size={20} /> : false
                      }
                      size="md"
                      type="email"
                    />
                  </Input.Wrapper>
                  <PasswordInput
                    error={loginError ? loginError : false}
                    label="Password"
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    placeholder="Password Here"
                    required
                    size="md"
                  />
                </Flex>
                <Flex
                  align={'center'}
                  justify={'space-between'}
                  mt="lg"
                  w={'100%'}
                >
                  <Text size="sm">
                    Create Account&nbsp;
                    <Link to={'/signup'}>Sign Up</Link>
                  </Text>
                  <BasicButton
                    disabled={!(email && mailValid && password)}
                    onClick={() => {
                      handleSubmit(email, password);
                    }}
                    size="md"
                  >
                    Log In
                  </BasicButton>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
