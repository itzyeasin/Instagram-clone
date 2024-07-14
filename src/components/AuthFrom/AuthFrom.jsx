import { Box, Flex, Text, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import ThirdPartyAuth from './ThirdPartyAuth';

const AuthFrom = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={'pointer'} alt="Instagram" />

          {isLogin ? <Login /> : <Signup />}

          {/** OR TEXT */}
          <Flex
            alignItems="center"
            justifyContent="center"
            my={4}
            gap={1}
            w="full"
          >
            <Box flex={1} h="1px" bg="gray.400" />
            <Text mx={1} color="gray.400">
              OR
            </Text>
            <Box flex={1} h="1px" bg="gray.400" />
          </Flex>

          {/** LOG IN WITH ThirdParty */}
          <ThirdPartyAuth prefix={isLogin ? 'Log in' : 'Sign up'} />
        </VStack>
      </Box>

      {/** DO YOU HAVE ANY ACCOUNT */}
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex ms={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {' '}
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            color={'blue.500'}
            cursor={'pointer'}
          >
            {isLogin ? 'Sign up' : ' Log in'}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthFrom;
