import { useSetAtom } from 'jotai';
import {
  selectedPostAtom,
  showPostDetailDialogAtom,
} from '@/entities/post/model/postAtoms';
import { useCommentState } from '@/entities/comment/model/useCommentState';
import { Post } from '@/entities/post/model/type';

export const usePostModals = () => {
  const { fetchComments } = useCommentState();
  const setSelectedPost = useSetAtom(selectedPostAtom);
  const setShowPostDetailDialog = useSetAtom(showPostDetailDialogAtom);

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return { openPostDetail };
};
