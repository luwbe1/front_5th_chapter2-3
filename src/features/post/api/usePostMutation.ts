import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postCreatePost,
  putUpdatedPost,
  deletePost,
} from '@/entities/post/api/api';
import { useSetAtom } from 'jotai';
import { postsAtom } from '@/entities/post/model/postAtoms';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const setPosts = useSetAtom(postsAtom);

  return useMutation({
    mutationFn: postCreatePost,
    onSuccess: data => {
      setPosts(prev => [data, ...prev]);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: error => {
      console.error('게시물 추가 오류:', error);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const setPosts = useSetAtom(postsAtom);

  return useMutation({
    mutationFn: putUpdatedPost,
    onSuccess: updatedPost => {
      setPosts(prev =>
        prev.map(post => (post.id === updatedPost.id ? updatedPost : post))
      );
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: error => {
      console.error('게시물 업데이트 오류:', error);
    },
  });
};

export const useDeletePost = () => {
  const setPosts = useSetAtom(postsAtom);

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_data, id) => {
      setPosts(prev => prev.filter(post => post.id !== id));
    },
    onError: error => {
      console.error('게시물 삭제 오류:', error);
    },
  });
};
