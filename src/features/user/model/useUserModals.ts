import { useSetAtom } from 'jotai';
import {
  selectedUserAtom,
  showUserModalAtom,
} from '@/entities/user/model/userAtoms';
import { User } from '@/entities/user/model/type';
import { getUser } from '@/entities/user/api/api';
import { useQueryClient } from '@tanstack/react-query';

export const useUserModals = () => {
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const setShowUserModal = useSetAtom(showUserModalAtom);
  const queryClient = useQueryClient();

  const openUserModal = async (user?: User) => {
    if (!user) return;

    try {
      const userData = await queryClient.fetchQuery({
        queryKey: ['user', user.id],
        queryFn: () => getUser(user.id),
        staleTime: 1000 * 60 * 5,
      });

      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };

  return { openUserModal };
};
