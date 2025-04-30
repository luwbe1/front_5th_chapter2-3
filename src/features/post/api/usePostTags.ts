import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/entities/post/api/api';

export const usePostTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: 1000 * 60 * 5,
  });
};
