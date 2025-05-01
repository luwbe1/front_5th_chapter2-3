import { PostsFilters } from '@/features/post/ui/PostsFilter';
import { PostsTable } from '@/features/post/ui/PostsTable';
import { PostPagination } from '@/features/post/ui/PaginationControls';
import { useUserModals } from '@/features/user/model/useUserModals';
import { usePostModals } from '@/features/post/model/usePostModals';

export const PostContent = () => {
  const { openUserModal } = useUserModals();
  const { openPostDetail } = usePostModals();

  return (
    <div className="flex flex-col gap-4">
      <PostsFilters />

      <PostsTable
        openUserModal={openUserModal}
        openPostDetail={openPostDetail}
      />

      <PostPagination />
    </div>
  );
};
