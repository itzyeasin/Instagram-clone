import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/timeAgo';
import useUserProfileStore from '../../store/userProfileStore';

const Caption = ({ post }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePicURL} size={'sm'} />
      </Link>
      <Box flex="1">
        <Text>
          <Link to={`/${userProfile.username}`}>
            <Text as="span" fontWeight="bold" fontSize={14} mr={2}>
              {userProfile.username}
            </Text>
          </Link>
          <Text as="span" fontSize={14} wordBreak="break-word">
            {post.caption}
          </Text>
        </Text>
        <Text fontSize={12} color="gray" mt={1}>
          {timeAgo(post.createdAt)}
        </Text>
      </Box>
    </Flex>
  );
};

export default Caption;
