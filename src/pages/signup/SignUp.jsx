import { Box, Flex, Input, PasswordInput, Text } from '@mantine/core';

import signupBg from '../../assets/signupbg.jpg';
import { BasicButton } from '../../components/Buttons';
import Link from '../../components/Link';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { setEmail, setName, setPassword } from "../../redux/reducers/signupFormSlice"
import { setAccessToken } from "../../redux/reducers/accessTokenSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconExclamationCircle } from '@tabler/icons-react';

function SignUp() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.accessToken)
  const [signupError, setSignupError] = useState()
  const navigate = useNavigate()
  const [mailValid, setMailValid] = useState(true)
  const { name, email, password } = useSelector(state => state.signupForm)

  const emailIsValid = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  }


  const handleSignUp = (name, email, password) => {
    axios.post("http://localhost:3000/auth/signup", {
      name: name,
      email: email,
      password: password
    }, {
      withCredentials: true,
    }).then(res => {
      console.log(res.data.accessToken);
      dispatch(setAccessToken(res.data.accessToken))
      setSignupError(null);
      navigate('/')
    }).catch(e => {
      console.log(e.response.data.message)
      setSignupError(e.response.data.message)
    })
  }

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
            xl: 'row',
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
            }}
            style={{
              backgroundImage: `url(${signupBg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            w={{
              xs: '100%',
              sm: '100%',
              md: '50%',
              lg: '40%',
              xl: '40%',
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
              }}

              p="xl"
              style={{
                backgroundImage: `url(${signupBg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              <Text component="div" fw={700} size="xl" ta={'center'}>
                Join the Lazey Life!
              </Text>
              <Text fw={500} size="lg" ta={'center'}>
                Get started in seconds. Find amazing deals and shop with ease!
              </Text>
              { }
            </Flex>
          </Box>

          <Flex
            align={'center'}
            className="login-box2"
            justify={'center'}
            mih={{
              md: '100%',
              sxs: '400px',
            }}
            p={{ md: 'none', xs: 'lg' }}
            w={{
              xs: '100%',
              sm: '100%',
              md: '50%',
              lg: '60%',
              xl: '60%',
            }}
          >
            <Box
              mih={'30%'}
              w={{
                xs: '90%',
                sm: '60%',
                md: '70%',
                xl: '40%',
              }}
            >
              <Flex direction={'column'} h={'100%'} justify={'space-evenly'}>
                <Flex direction={'column'} gap={'lg'}>
                  <Input.Wrapper label="Name" required>
                    <Input
                      placeholder="Enter Your Name"
                      size="md"
                      type="text"
                      onChange={e => {
                        dispatch(setName(e.target.value))
                        setSignupError(null)
                      }}
                      error={signupError ? true : false}
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="E-mail" required>
                    <Input placeholder="Email Here" size="md" type="email" onChange={e => {
                      dispatch(setEmail(e.target.value))
                      setSignupError(null)
                    }} error={(signupError || !mailValid)}
                      onBlur={() => {
                        setMailValid(emailIsValid(email))
                        console.log(mailValid)
                      }}
                      rightSection={(!mailValid) ?
                        <IconExclamationCircle
                          size={20}
                        /> : false
                      }
                      onFocus={() => {
                        setMailValid(true)
                      }}
                    />
                  </Input.Wrapper>
                  <PasswordInput
                    label="Password"
                    placeholder="Password Here"
                    required
                    size="md"
                    onChange={e => {
                      dispatch(setPassword(e.target.value))
                      setSignupError(null)
                    }}
                    error={signupError ? signupError : false}
                  />
                </Flex>
                <Flex
                  align={'center'}
                  justify={'space-between'}
                  mt="lg"
                  w={'100%'}
                >
                  <Text size="sm">
                    Have an account? <Link to={'/login'}>Log In</Link>
                  </Text>
                  <BasicButton size="md" disabled={!(name && (email && mailValid) && password)} onClick={() => {
                    handleSignUp(name, email, password)

                  }}>Sign Up</BasicButton>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex >
      </Flex >
    </>
  );
}

export default SignUp;
