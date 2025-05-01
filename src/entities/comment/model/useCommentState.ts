import { useAtom } from 'jotai';
import {
  commentsAtom,
  selectedCommentAtom,
  newCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from './commentAtoms';
import { getComments } from '../api/api';

export const useCommentState = () => {
  const [comments, setComments] = useAtom(commentsAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(
    showAddCommentDialogAtom
  );
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(
    showEditCommentDialogAtom
  );

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 캐시된 댓글이 있으면 재요청 안 함
    const data = await getComments(postId);
    setComments(prev => ({ ...prev, [postId]: data.comments }));
  };

  return {
    comments,
    selectedComment,
    newComment,
    setNewComment,
    setSelectedComment,
    fetchComments,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    showAddCommentDialog,
    showEditCommentDialog,
  };
};
