import { fetchInstance } from '@/shared/lib/fetchInstance';
import { FetchUsersResponse, User } from '../model/type';

export const getUsers = () => {
  return fetchInstance<FetchUsersResponse>(
    'users?limit=0&select=username,image'
  );
};

export const getUser = (id: number) => {
  return fetchInstance<User>(`users/${id}`);
};
