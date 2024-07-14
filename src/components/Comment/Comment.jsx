import {
  Avatar,
  Box,
  Flex,
  Text,
  Link,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { timeAgo } from '../../utils/timeAgo';

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  if (isLoading) return <CommentSkeleton />;

  return (
    <Flex gap={3} alignItems={'start'} mb={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>
      <Box>
        <Text fontSize={'sm'}>
          <Link to={`/${userProfile.username}`}>
            <Text as={'span'} fontWeight={'bold'} mr={2}>
              {userProfile.username}
            </Text>
          </Link>
          {comment.comment}
        </Text>
        <Text fontSize={'xs'} color={'gray.500'}>
          {timeAgo(comment.createdAt)}
        </Text>
      </Box>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={3} w={'full'} alignItems={'center'} mb={4}>
      <SkeletonCircle h={10} w="10" />
      <Box flex={1}>
        <Skeleton height={4} mb={2} />
        <Skeleton height={3} width="50%" />
      </Box>
    </Flex>
  );
};
