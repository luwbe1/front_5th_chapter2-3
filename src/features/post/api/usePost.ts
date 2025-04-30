import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/entities/post/api/api';

export const usePosts = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ['posts', limit, skip],
    queryFn: () => getPosts(limit, skip),
    staleTime: 1000 * 60, // 1분 캐시 유지
  });
};
