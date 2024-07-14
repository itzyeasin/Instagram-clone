import { Box, Flex, Text } from '@chakra-ui/react';
import { BsBookmark, BsGrid3X3 } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';

const ProfileTabs = () => {
  return (
    <Flex
      w={'full'}
      justifyContent={'center'}
      gap={{ base: 4, sm: 10 }}
      textTransform={'uppercase'}
      fontWeight={'bold'}
    >
      <Flex
        borderTop={'1px solid white'}
        alignItems={'center'}
        p={'3'}
        gap={2}
        cursor={'pointer'}
      >
        <Box fontSize={'xs'}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Posts
        </Text>
      </Flex>

      <Flex alignItems={'center'} p={'3'} gap={2} cursor={'pointer'}>
        <Box fontSize={'xs'}>
          <BsBookmark />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Saved
        </Text>
      </Flex>

      <Flex alignItems={'center'} p={'3'} gap={2} cursor={'pointer'}>
        <Box fontSize={'xs'}>
          <FiVideo fontWeight={'bold'} />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Reels
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileTabs;
