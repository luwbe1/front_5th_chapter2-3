import { fetchInstance } from '@/shared/lib/fetchInstance';
import { FetchUsersResponse, User } from '../model/type';

export const getUsers = async () => {
  return fetchInstance<FetchUsersResponse>(
    '/api/users?limit=0&select=username,image'
  );
};

export const getUser = (id: number) => {
  return fetchInstance<User>(`/api/users/${id}`);
};
