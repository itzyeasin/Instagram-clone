import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import Comment from '../Comment/Comment';
import usePostComment from '../../hooks/usePostComment';
import { useEffect, useRef } from 'react';

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = '';
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent
        bg={'black'}
        maxW={'600px'}
        borderRadius="md"
        boxShadow="xl"
      >
        <ModalHeader p={4} borderBottom="1px solid" borderColor="gray.200">
          <Text fontWeight="bold" fontSize="md">
            Comments
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={4}>
          <Box maxH={'400px'} overflowY={'auto'} ref={commentsContainerRef}>
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Box>
          <form onSubmit={handleSubmitComment} style={{ marginTop: '1rem' }}>
            <Flex alignItems="center" gap={2}>
              <Input
                placeholder="Add a comment..."
                size="sm"
                ref={commentRef}
                borderRadius="full"
                bg="gray.700"
                _focus={{ bg: 'gray.900', borderColor: 'gray.400' }}
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                color="white"
                bg="blue.500"
                _hover={{ bg: 'blue.600' }}
                _active={{ bg: 'blue.700' }}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
