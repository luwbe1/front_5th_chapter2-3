import { useMutation } from '@tanstack/react-query';
import {
  postCreateComment,
  putUpdateComment,
  deleteComment,
  patchLikeComment,
} from '@/entities/comment/api/api';
import { Comment } from '@/entities/comment/model/type';
import { commentsAtom } from '@/entities/comment/model/commentAtoms';
import { useSetAtom } from 'jotai';

export const useAddComment = () => {
  const setComments = useSetAtom(commentsAtom);

  return useMutation({
    mutationFn: postCreateComment,
    onSuccess: (data: Comment) => {
      setComments(prev => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }));
    },
    onError: error => {
      console.error('댓글 추가 오류:', error);
    },
  });
};

export const useUpdateComment = () => {
  const setComments = useSetAtom(commentsAtom);

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) =>
      putUpdateComment(id, body),
    onSuccess: (data: Comment) => {
      setComments(prev => ({
        ...prev,
        [data.postId]: prev[data.postId].map(comment =>
          comment.id === data.id ? data : comment
        ),
      }));
    },
    onError: error => {
      console.error('댓글 업데이트 오류:', error);
    },
  });
};

export const useDeleteComment = () => {
  const setComments = useSetAtom(commentsAtom);

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteComment(id),
    onSuccess: (_, { id, postId }) => {
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(comment => comment.id !== id),
      }));
    },
    onError: error => {
      console.error('댓글 삭제 오류:', error);
    },
  });
};

export const useLikeComment = () => {
  const setComments = useSetAtom(commentsAtom);

  return useMutation({
    mutationFn: ({ id, currentLikes }: { id: number; currentLikes: number }) =>
      patchLikeComment(id, currentLikes + 1),
    onSuccess: (data: Comment) => {
      setComments(prev => ({
        ...prev,
        [data.postId]: prev[data.postId].map(comment =>
          comment.id === data.id ? data : comment
        ),
      }));
    },
    onError: error => {
      console.error('댓글 좋아요 오류:', error);
    },
  });
};
