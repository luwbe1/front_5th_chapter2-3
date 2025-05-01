import { getComments } from '@/entities/comment/api/api';
import { commentsAtom } from '@/entities/comment/model/commentAtoms';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export const useFetchComments = () => {
  const setComments = useSetAtom(commentsAtom);
  const queryClient = useQueryClient();

  const fetchComments = async (postId: number) => {
    // 캐시에 있으면 조기 종료
    const cached = queryClient.getQueryData(['comments', postId]);
    if (cached) return;

    // fetchQuery는 없으면 요청하고 있으면 기다림
    const data = await queryClient.fetchQuery({
      queryKey: ['comments', postId],
      queryFn: () => getComments(postId),
      staleTime: 1000 * 60 * 5,
    });

    setComments(prev => ({
      ...prev,
      [postId]: data.comments,
    }));
  };

  return { fetchComments };
};
