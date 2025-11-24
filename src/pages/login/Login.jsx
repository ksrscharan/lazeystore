import { Box, Flex, Input, PasswordInput,Text } from '@mantine/core';

import bakImage from '../../assets/loginbg.png';
import { BasicButton } from '../../components/Buttons';
import Link from '../../components/Link';
import Navbar from '../../components/navbar/Navbar';

function Login() {
  //! const getNewAccessToken = () => {
  //!   axios.get('http://localhost:3000/auth/createAccessToken', {
  //!     headers: {
  //!       "Content-Type": "application/json"
  //!     },
  //!     withCredentials: true
  //!   },).then(res => dispatch(setAccessToken(res.data.accessToken))).catch(e => console.log(e.message))
  //! }
  return (
    <>
      <Flex direction={'column'} mih={'100vh'}>
        <Navbar />

        <Flex
          direction={{
            lg: 'row',
            md: 'row',
            sm: 'column',
            xl: 'row',
            xs: 'column',
          }}
          gutter={0}
          style={{ flexGrow: 1 }}
        >
          <Box
            bg={'green.0'}
            mih={{
              md: '100%',
              sm: '200px',
              xs: '200px',
            }}
            style={{
              backgroundImage: `url(${bakImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            

            w={{
              lg: '40%',
              md: '30%',
              sm: '100%',
              xl: '40%',
              xs: '100%',
            }}
          >
            <Flex
              align="center"
              direction="column"
              justify="center"
              mih={{ md: '100%', sm: '200px', sxs: '200px', xs: '200px' }}
              p="xl"
              style={{
                backgroundImage: `url(${bakImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              <Text component="div" fw={700} size="xl" ta={'center'}>
                Glad You're Back!
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
              md: '100%',
              sxs: '400px',
            }}
            p={{ md: 'none', xs: 'lg' }}
            w={{
              lg: '60%',
              md: '70%',
              sm: '100%',
              xl: '60%',
              xs: '100%',
            }}
          >
            <Box
              mih={'30%'}
              w={{
                md: '70%',
                sm: '60%',
                xl: '40%',
                xs: '90%',
              }}
            >
              <Flex direction={'column'} h={'100%'} justify={'space-evenly'}>
                <Flex direction={'column'} gap={'lg'}>
                  <Input.Wrapper label="E-mail" required>
                    <Input placeholder="Email Here" size="md" type="email" />
                  </Input.Wrapper>
                  <PasswordInput
                    label="Password"
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
                    Create Account <Link to={'/signup'}>Sign Up</Link>
                  </Text>
                  <BasicButton size="md">Log In</BasicButton>
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
