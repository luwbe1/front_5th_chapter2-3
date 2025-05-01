import { useAtom } from 'jotai';
import { newPostAtom, selectedPostAtom } from './postAtoms';

export const usePostState = () => {
  const [newPost, setNewPost] = useAtom(newPostAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);

  return {
    newPost,
    setNewPost,
    selectedPost,
    setSelectedPost,
  };
};
