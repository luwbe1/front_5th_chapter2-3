import { useQuery } from '@tanstack/react-query';
import { getTags } from '@/entities/post/api/api';
import { Tag } from '@/entities/post/model/type';

export const useTagsQuery = () => {
  return useQuery<Tag[]>({
    queryKey: ['tags'],
    queryFn: getTags,
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });
};
