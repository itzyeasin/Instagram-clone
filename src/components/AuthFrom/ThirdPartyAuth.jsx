import { Flex, Image, Text } from '@chakra-ui/react';
import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';

import { auth, firestore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';
import useAuthStore from '../../store/authStore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ThirdPartyAuth = () => {
  const [signInWithGoogle, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);

  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleAuth = async (authProvider, error) => {
    try {
      const newUser = await authProvider();
      if (!newUser && error) {
        showToast('Error', error.message, 'error');
        return;
      }
      const userRef = doc(firestore, 'users', newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // User already exists, log in
        const userDoc = userSnap.data();
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // New user, sign up
        const email = newUser.user.email || '';
        const displayName = newUser.user.displayName || '';
        const username = email
          ? email.split('@')[0]
          : displayName.split(' ').join('');

        const userDoc = {
          uid: newUser.user.uid,
          email: email,
          username: username,
          fullName: displayName,
          bio: '',
          profilePicURL: newUser.user.photoURL || '',
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  const handleGoogleAuth = () => handleAuth(signInWithGoogle, googleError);
  const handleFacebookAuth = () =>
    handleAuth(signInWithFacebook, facebookError);

  return (
    <Flex direction="row" alignItems="center" gap={5}>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        onClick={handleGoogleAuth}
        isLoading={googleLoading}
      >
        <Image src="/google.png" w={5} alt="Google logo" />
        <Text mx="2" color={'blue.500'}>
          Google
        </Text>
      </Flex>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        onClick={handleFacebookAuth}
        isLoading={facebookLoading}
      >
        <Image src="/facebook.png" w={5} alt="Facebook logo" />
        <Text mx="2" color={'blue.500'}>
          Facebook
        </Text>
      </Flex>
    </Flex>
  );
};

export default ThirdPartyAuth;
