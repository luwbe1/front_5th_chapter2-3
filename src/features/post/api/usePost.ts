import { useQuery } from '@tanstack/react-query';
import { fetchPostsData } from '@/entities/post/api/fetchPostsData';

export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ['posts', limit, skip],
    queryFn: () => fetchPostsData(limit, skip),
    enabled: false,
    staleTime: 1000 * 60,
  });
};
