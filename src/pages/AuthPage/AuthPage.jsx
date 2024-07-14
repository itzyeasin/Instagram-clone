import { Box, Image, Container, Flex, VStack } from '@chakra-ui/react';
import AuthFrom from '../../components/AuthFrom/AuthFrom';

const AuthPage = () => {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
          {/*LEFT HAND SIDE*/}
          <Box display={{ base: 'none', md: 'block' }}>
            <Image src="/auth.png" h={650} alt="Phone Img" />
          </Box>
          {/*RIGHT HAND SIDE*/}
          <VStack spacing={4} align={'stretch'}>
            <AuthFrom />
            <Box textAlign={'center'}>Get the app.</Box>
            <Flex gap={5} justifyContent={'center'}>
              <Image src="/playstore.png" h={'10'} alt="Playstore logo" />
              <Image src="/microsoft.png" h={'10'} alt="Microsoft logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
