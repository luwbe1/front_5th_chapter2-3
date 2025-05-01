import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';
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
import { useEffect } from 'react';
import { Post } from '@/entities/post/model/type';
import { User } from '@/entities/user/model/type';
import { useUpdateURL } from '@/features/post/model/useUpdateURL';

interface PostContentProps {
  openUserModal: (user: User) => void;
  openPostDetail: (post: Post) => void;
}

export const PostContent = ({
  openUserModal,
  openPostDetail,
}: PostContentProps) => {
  const location = useLocation();
  const [posts] = useAtom(postsAtom);
  const [total] = useAtom(totalAtom);
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [tags] = useAtom(tagsAtom);
  const { searchPosts, fetchPostsByTag, deletePost, fetchPosts, fetchTags } =
    usePostHandlers();
  const { updateURL } = useUpdateURL();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (selectedTag) fetchPostsByTag(selectedTag);
    else fetchPosts();

    updateURL();
  }, [
    skip,
    limit,
    sortBy,
    sortOrder,
    selectedTag,
    updateURL,
    fetchPostsByTag,
    fetchPosts,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get('skip') || '0'));
    setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder((params.get('sortOrder') as 'asc' | 'desc') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [
    location.search,
    setLimit,
    setSkip,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  ]);

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
