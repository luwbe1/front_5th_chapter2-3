import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/entities/comment/api/api';
import { Comment } from '@/entities/comment/model/type';

export const useCommentsQuery = (postId: number, enabled: boolean = true) => {
  return useQuery<{ comments: Comment[] }>({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });
};
