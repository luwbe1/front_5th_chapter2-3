import { PostFilters } from '@/features/post/ui/PostsFilter';
import { PostTable } from '@/features/post/ui/PostTable';
import { PostPagination } from '@/features/post/ui/PaginationControls';
import { useUserModals } from '@/features/user/model/useUserModals';
import { usePostModals } from '@/features/post/model/usePostModals';

export const PostContent = () => {
  const { openUserModal } = useUserModals();
  const { openPostDetail } = usePostModals();

  return (
    <div className="flex flex-col gap-4">
      <PostFilters />

      <PostTable
        openUserModal={openUserModal}
        openPostDetail={openPostDetail}
      />

      <PostPagination />
    </div>
  );
};
