import { useAtom } from 'jotai';
import {
  commentsAtom,
  selectedCommentAtom,
  newCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from './atom';
import {
  getComments,
  postCreateComment,
  putUpdateComment,
  deleteComment,
  patchLikeComment,
} from '../api/api';
import { Comment } from './type';

export const useCommentHandlers = () => {
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

  // 댓글 추가
  const addComment = async () => {
    const data = await postCreateComment(newComment);
    setComments(prev => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data as Comment],
    }));
    setShowAddCommentDialog(false);
    setNewComment({ body: '', postId: 0, userId: 1 });
  };

  // 댓글 수정
  const updateComment = async () => {
    if (!selectedComment) return;
    const data = await putUpdateComment(
      selectedComment.id,
      selectedComment.body
    );
    setComments(prev => ({
      ...prev,
      [data.postId]: prev[data.postId].map(comment =>
        comment.id === data.id ? data : comment
      ),
    }));
    setShowEditCommentDialog(false);
  };

  // 댓글 삭제
  const deleteCommentById = async (id: number, postId: number) => {
    await deleteComment(id);
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].filter(comment => comment.id !== id),
    }));
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const currentLikes = comments[postId]?.find(c => c.id === id)?.likes ?? 0;
    const data = await patchLikeComment(id, currentLikes + 1);
    setComments(prev => ({
      ...prev,
      [postId]: prev[postId].map(comment =>
        comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment
      ),
    }));
  };

  return {
    comments,
    selectedComment,
    newComment,
    setNewComment,
    setSelectedComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComments: deleteCommentById,
    likeComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    showAddCommentDialog,
    showEditCommentDialog,
  };
};
