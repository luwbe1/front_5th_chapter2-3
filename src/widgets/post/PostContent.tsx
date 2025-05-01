import { PostsFilters } from '@/features/post/ui/PostsFilter';
import { PostsTable } from '@/features/post/ui/PostsTable';
import { PostPagination } from '@/features/post/ui/PaginationControls';

export const PostContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <PostsFilters />
      <PostsTable />
      <PostPagination />
    </div>
  );
};
