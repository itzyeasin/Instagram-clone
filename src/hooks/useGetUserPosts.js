import { useEffect, useState } from 'react';
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      // Check if userProfile or userProfile.uid is undefined
      if (!userProfile || !userProfile.uid) {
        // If userProfile is not yet initialized, set loading to false and return early
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setPosts([]);

      try {
        // If userProfile.uid is defined, proceed with Firestore query
        const q = query(
          collection(firestore, 'posts'),
          where('createdBy', '==', userProfile.uid) // This line causes error if userProfile.uid is undefined
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [setPosts, userProfile, showToast]); // Dependency array includes userProfile to rerun effect when it changes

  return { isLoading, posts };
};

export default useGetUserPosts;
