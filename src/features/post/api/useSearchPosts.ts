import { useQuery } from '@tanstack/react-query';
import { getSearchedPosts } from '@/entities/post/api/api';
import { FetchPostsResponse } from '@/entities/post/model/type';

export const useSearchPosts = (searchQuery: string, enabled: boolean) => {
  return useQuery<FetchPostsResponse>({
    queryKey: ['search-posts', searchQuery],
    queryFn: () => getSearchedPosts(searchQuery),
    enabled,
  });
};
