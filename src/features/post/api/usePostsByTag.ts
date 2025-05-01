import { useQuery } from '@tanstack/react-query';
import { fetchPostsByTagData } from '@/entities/post/api/fetchPostsByTag';
import { Post } from '@/entities/post/model/type';

export const usePostsByTagQuery = (tag: string) => {
  return useQuery<{ posts: Post[]; total: number }>({
    queryKey: ['posts', 'byTag', tag],
    queryFn: () => fetchPostsByTagData(tag),
    enabled: false,
    staleTime: 1000 * 60,
  });
};
