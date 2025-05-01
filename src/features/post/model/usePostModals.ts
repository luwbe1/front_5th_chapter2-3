import { useSetAtom } from 'jotai';
import {
  selectedPostAtom,
  showPostDetailDialogAtom,
} from '@/entities/post/model/postAtoms';
import { Post } from '@/entities/post/model/type';
import { useFetchComments } from '@/features/comment/model/useFetchComments';

export const usePostModals = () => {
  const setSelectedPost = useSetAtom(selectedPostAtom);
  const setShowPostDetailDialog = useSetAtom(showPostDetailDialogAtom);
  const { fetchComments } = useFetchComments();

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return { openPostDetail };
};
