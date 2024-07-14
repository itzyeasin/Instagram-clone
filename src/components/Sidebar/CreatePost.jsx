import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
  useColorMode,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { CreatePostLogo } from '../../assets/constants';
import { BsFillImageFill } from 'react-icons/bs';
import { useRef, useState } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';
import useUserProfileStore from '../../store/userProfileStore';
import { useLocation } from 'react-router-dom';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

// Set the maximum caption length
const MAX_CAPTION_LENGTH = 280;

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState('');
  const imageRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();
  const { colorMode } = useColorMode();

  // Handle caption change and enforce maximum character limit
  const handleCaptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CAPTION_LENGTH) {
      setCaption(value);
    }
  };

  // Include character limit check before posting
  const handlePostCreation = async () => {
    if (caption.length > MAX_CAPTION_LENGTH) {
      showToast(
        'Error',
        `Caption exceeds ${MAX_CAPTION_LENGTH} characters`,
        'error'
      );
      return;
    }

    try {
      await handleCreatePost(selectedFile, caption);
      onClose();
      setCaption('');
      setSelectedFile(null);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={'Create'}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}
          cursor="pointer"
        >
          <CreatePostLogo />
          <Text display={{ base: 'none', md: 'inline-block' }}>Create</Text>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent
          bg={colorMode === 'light' ? 'white' : 'black'}
          borderRadius="md"
          boxShadow="lg"
        >
          <ModalHeader borderBottom="1px" borderColor="gray.200">
            Create Post
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="What do you want to share?"
              value={caption}
              onChange={handleCaptionChange}
              mb={4}
              borderRadius="md"
              resize="none"
              autoFocus
              focusBorderColor="teal.500"
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.600' }}
              _focus={{
                boxShadow: '0 0 0 2px rgba(19,124,189,0.5)',
              }}
            />
            <Text
              fontSize="sm"
              color="gray.500"
              textAlign="right"
              mt={-2}
              mb={4}
            >
              {caption.length}/{MAX_CAPTION_LENGTH}
            </Text>

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <Tooltip label="Add Image" placement="top" hasArrow>
              <Box
                onClick={() => imageRef.current.click()}
                cursor="pointer"
                color="white"
                _hover={{ color: 'gray.300' }}
                transition="color 0.2s"
                display="inline-block"
                mb={4}
              >
                <BsFillImageFill size={24} />
              </Box>
            </Tooltip>

            {selectedFile && (
              <Flex
                mt={4}
                w="full"
                position="relative"
                justifyContent="center"
                borderRadius="md"
                overflow="hidden"
              >
                <Image src={selectedFile} alt="Selected img" maxH="300px" />
                <CloseButton
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              size="sm"
              onClick={handlePostCreation}
              isLoading={isLoading}
              color="black"
              colorScheme={'blue'}
              _hover={{ bg: 'blue.500' }}
              _active={{ bg: 'blue.700' }}
              mr={3}
              px={4}
            >
              {isLoading ? <Spinner size="sm" /> : 'Post'}
            </Button>

            <Button
              size="sm"
              onClick={onClose}
              variant="outline"
              borderRadius="md"
              borderColor="gray.400"
              px={4}
              _hover={{ bg: 'gray.700' }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const { pathname } = useLocation();

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error('Please select an image');
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
      const userDocRef = doc(firestore, 'users', authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      // Add null check for userProfile before accessing its properties
      if (userProfile && userProfile.uid === authUser.uid) {
        createPost({ ...newPost, id: postDocRef.id });
      }

      if (userProfile && pathname !== '/' && userProfile.uid === authUser.uid) {
        addPost({ ...newPost, id: postDocRef.id });
      }

      showToast('Success', 'Post created successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
