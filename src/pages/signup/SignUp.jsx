import { Box, Flex, Input, PasswordInput, Text } from '@mantine/core';

import signupBg from '../../assets/signupbg.jpg';
import { BasicButton } from '../../components/Buttons';
import Link from '../../components/Link';
import Navbar from '../../components/navbar/Navbar';

function SignUp() {
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
              backgroundImage: `url(${signupBg})`,
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
              {}
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
                  <Input.Wrapper label="Name" required>
                    <Input
                      placeholder="Enter Your Name"
                      size="md"
                      type="text"
                    />
                  </Input.Wrapper>
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
                    Have an account? <Link to={'/login'}>Log In</Link>
                  </Text>
                  <BasicButton size="md">Sign Up</BasicButton>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default SignUp;
