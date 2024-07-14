import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useAuthStore from '../../store/authStore';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useShowToast from '../../hooks/useShowToast';

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    bio: '',
  });

  const authuser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const { isUpdating, editProfile } = useEditProfile();
  const showToast = useShowToast();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast('error', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === 'username' ? value.toLowerCase() : value, // Convert to lowercase for username
    }));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={'#000'}
          borderRadius={'lg'}
          boxShadow={'0 4px 12px rgba(0, 0, 0, 0.1)'}
          maxW={'lg'}
          mx={3}
        >
          <ModalHeader textAlign={'center'} fontWeight={'bold'}>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={'column'} align={'center'}>
              <Stack spacing={6} w={'full'} maxW={'md'} p={6}>
                <FormControl>
                  <Stack
                    direction={['column', 'row']}
                    spacing={6}
                    align={'center'}
                  >
                    <Avatar
                      size="xl"
                      src={selectedFile || authuser.profilePicURL}
                      border={'2px solid #e1e1e1'}
                    />
                    <Button
                      variant={'outline'}
                      onClick={() => fileRef.current.click()}
                    >
                      Change Profile Picture
                    </Button>
                    <Input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>

                <FormControl id="fullName">
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    name="fullName"
                    placeholder={'Full Name'}
                    value={inputs.fullName || authuser.fullName}
                    onChange={handleInputChange}
                    maxLength={20}
                  />
                </FormControl>

                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    placeholder={'Username'}
                    value={inputs.username || authuser.username}
                    onChange={handleInputChange}
                    maxLength={15}
                  />
                </FormControl>

                <FormControl id="bio">
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    name="bio"
                    placeholder={'Bio'}
                    value={inputs.bio || authuser.bio}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <Stack direction={'row'} spacing={4} w={'full'}>
                  <Button
                    variant={'outline'}
                    w={'full'}
                    onClick={onClose}
                    _hover={{ bg: 'gray.700' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme={'blue'}
                    w={'full'}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                    _hover={{ bg: 'blue.500' }}
                  >
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
