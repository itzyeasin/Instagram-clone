import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from '@chakra-ui/react';
import FeedPost from './FeedPost';
import useGetFeedPosts from '../../hooks/useGetFeedPosts';

import { CommentLogo, UnlikeLogo } from '../../assets/constants';

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  // Fix: Created a dummyPosts array with unique ids for each dummy post
  const dummyPosts = [
    {
      id: 'dummy1',
      username: 'cristiano',
      avatar: '/p1.png',
      time: '1w',
      image: '/img1.png',
      captions: 'Hala Madrid!🤍',
    },
    {
      id: 'dummy2',
      username: 'leomessi',
      avatar: '/p2.png',
      time: '1w',
      image: '/img2.png',
      captions: 'Let the pre season begin...',
    },
    {
      id: 'dummy3',
      username: 'neymarjr',
      avatar: '/p3.png',
      time: '1w',
      image: '/img3.png',
      captions: 'Its a pride that not everyone can have 🤍🖤',
    },
    {
      id: 'dummy4',
      username: 'sergioramos',
      avatar: '/p4.png',
      time: '1w',
      image: '/img4.png',
      captions:
        'Nine months after re-sinking the sevillafc shirt with tears of excitement in my eyes',
    },
  ];

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={'flex-start'}>
                <Skeleton height={'10px'} w={'200px'} />
                <Skeleton height={'10px'} w={'200px'} />
              </VStack>
            </Flex>
            <Skeleton w={'full'}>
              <Box h={'400px'}> contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Box textAlign="center" py={10}>
            <Text fontSize={'md'} color={'gray.500'}>
              Welcome to our platform! It looks like you haven&apos;t posted
              anything yet.
            </Text>
            <Text color={'gray.500'}>
              Follow users to view dynamic posts; otherwise, you will only see
              dummy user data!
            </Text>
          </Box>

          {/** Fix: Mapping over the dummyPosts array and ensuring each element has a unique key */}
          {dummyPosts.map((dummyPost) => (
            <Box key={dummyPost.id} mb={10}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                w="full"
                my={2}
              >
                <Flex alignItems="center" gap={2}>
                  <Avatar
                    src={dummyPost.avatar}
                    alt="user profile pic"
                    size="sm"
                  />
                  <Flex fontSize="12px" fontWeight="bold" gap={2}>
                    <span>{dummyPost.username}</span>
                    <Box color="gray.500">• {dummyPost.time}</Box>
                  </Flex>
                </Flex>

                <Box cursor="pointer" aria-label="Unfollow button">
                  <Text
                    fontSize="12px"
                    color="blue.500"
                    fontWeight="bold"
                    _hover={{
                      color: 'white',
                    }}
                    transition="0.2s ease-in-out"
                  >
                    Unfollow
                  </Text>
                </Box>
              </Flex>

              <Box my={2} borderRadius={4} overflow={'hidden'}>
                <Image src={dummyPost.image} alt={'Profile Pic'} />
              </Box>

              <Box mb={6} mt={4}>
                <Flex
                  alignItems={'center'}
                  gap={4}
                  w={'full'}
                  pt={0}
                  mb={2}
                  mt={4}
                >
                  <Box cursor={'pointer'} fontSize={18}>
                    <UnlikeLogo />
                  </Box>
                  <Box cursor={'pointer'} fontSize={'sm'}>
                    <CommentLogo />
                  </Box>
                </Flex>

                <Text
                  fontSize={'sm'}
                  fontWeight={700}
                  mb={2}
                  cursor={'pointer'}
                >
                  {dummyPost.username}{' '}
                  <Text as="span" fontWeight={400}>
                    {dummyPost.captions}
                  </Text>
                </Text>

                <Text fontSize={'sm'} color={'gray'} cursor={'pointer'}>
                  View all comments
                </Text>

                <Flex
                  alignItems={'center'}
                  gap={2}
                  justifyContent={'space-between'}
                  w={'full'}
                >
                  <InputGroup>
                    <Input
                      variant={'flushed'}
                      placeholder={'Add a comment...'}
                      fontSize={14}
                    />
                    <InputRightElement>
                      <Button
                        fontSize={14}
                        color={'blue.500'}
                        fontWeight={600}
                        cursor={'pointer'}
                        _hover={{ color: 'white' }}
                        bg={'transparent'}
                      >
                        Post
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Container>
  );
};

export default FeedPosts;

// import {
//   Box,
//   Container,
//   Flex,
//   Skeleton,
//   SkeletonCircle,
//   Text,
//   VStack,
// } from '@chakra-ui/react';
// import FeedPost from './FeedPost';
// import useGetFeedPosts from '../../hooks/useGetFeedPosts';

// const FeedPosts = () => {
//   const { isLoading, posts } = useGetFeedPosts();

//   return (
//     <Container maxW={'container.sm'} py={10} px={2}>
//       {isLoading &&
//         [0, 1, 2].map((_, idx) => (
//           <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
//             <Flex gap={2}>
//               <SkeletonCircle size={10} />
//               <VStack gap={2} alignItems={'flex-start'}>
//                 <Skeleton height={'10px'} w={'200px'} />
//                 <Skeleton height={'10px'} w={'200px'} />
//               </VStack>
//             </Flex>
//             <Skeleton w={'full'}>
//               <Box h={'400px'}> contents wrapped</Box>
//             </Skeleton>
//           </VStack>
//         ))}

//       {!isLoading &&
//         posts.length > 0 &&
//         posts.map((post) => <FeedPost key={post.id} post={post} />)}
//       {!isLoading && posts.length === 0 && (
//         <>
//           <Text fontSize={'md'} color={'red.400'}>
//             Dayuum. Looks like you don&apos;t have any friends.
//           </Text>
//           <Text color={'red.400'}>Stop coding and go make some!!</Text>
//         </>
//       )}
//     </Container>
//   );
// };

// export default FeedPosts;
