import { useSetAtom } from 'jotai';
import {
  selectedUserAtom,
  showUserModalAtom,
} from '@/entities/user/model/atom';
import { getUser } from '@/entities/user/api/api';
import { User } from '@/entities/user/model/type';

export const useUserModals = () => {
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const setShowUserModal = useSetAtom(showUserModalAtom);

  const openUserModal = async (user: User) => {
    const userData = await getUser(user.id);
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  return { openUserModal };
};
