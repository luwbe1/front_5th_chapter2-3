// src/widgets/post/PostContent.tsx

import { useAtom } from 'jotai';
import { PostFilters } from '@/features/post/ui/PostsFilter';
import { PostTable } from '@/features/post/ui/PostTable';
import { PostPagination } from '@/features/post/ui/PaginationControls';
import { postsAtom, totalAtom, tagsAtom } from '@/entities/post/model/atom';
import {
  skipAtom,
  limitAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from '@/features/post/model/atom';
import { searchQueryAtom } from '@/features/post/model/atom';
import { usePostHandlers } from '@/entities/post/model/usePostHandlers';

import { Post } from '@/entities/post/model/type';
import { User } from '@/entities/user/model/type';

interface PostContentProps {
  openUserModal: (user: User) => void;
  openPostDetail: (post: Post) => void;
}

export const PostContent = ({
  openUserModal,
  openPostDetail,
}: PostContentProps) => {
  const [posts] = useAtom(postsAtom);
  const [total] = useAtom(totalAtom);
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [tags] = useAtom(tagsAtom);

  const { searchPosts, fetchPostsByTag, deletePost } = usePostHandlers();

  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <PostFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPosts={() => searchPosts(searchQuery)}
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        fetchPostsByTag={fetchPostsByTag}
        updateURL={updateURL}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <PostTable
        posts={posts}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        updateURL={updateURL}
        openUserModal={openUserModal}
        openPostDetail={openPostDetail}
        deletePost={deletePost}
      />

      <PostPagination
        skip={skip}
        limit={limit}
        total={total}
        setSkip={setSkip}
        setLimit={setLimit}
      />
    </div>
  );
};
