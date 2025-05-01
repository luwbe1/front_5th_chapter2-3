import { useSetAtom } from 'jotai';
import {
  selectedPostAtom,
  showPostDetailDialogAtom,
} from '@/entities/post/model/postAtoms';
import { useCommentHandlers } from '@/entities/comment/model/useCommentHandlers';
import { Post } from '@/entities/post/model/type';

export const usePostModals = () => {
  const { fetchComments } = useCommentHandlers();
  const setSelectedPost = useSetAtom(selectedPostAtom);
  const setShowPostDetailDialog = useSetAtom(showPostDetailDialogAtom);

  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return { openPostDetail };
};
