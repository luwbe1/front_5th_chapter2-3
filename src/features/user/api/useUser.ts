import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../entities/user/api/api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60, // 1분
  });
};
