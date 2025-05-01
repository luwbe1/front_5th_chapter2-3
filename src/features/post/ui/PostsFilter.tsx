import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAtom, useAtomValue } from 'jotai';
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from '@/features/post/model/atom';
import { tagsAtom } from '@/entities/post/model/postAtoms';
import { useSearchPosts } from '@/features/post/model/useSearchPosts';
import { useFetchPostsByTag } from '../model/useFetchPostsByTag';
import { useFetchPosts } from '@/features/post/model/useFetchPosts';
import { useFetchTags } from '../model/useFetchTags';
import { useEffect } from 'react';
import { useUpdateURL } from '../model/useUpdateURL';

export const PostsFilters = () => {
  const location = useLocation();
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const tags = useAtomValue(tagsAtom);
  const { updateURL } = useUpdateURL();
  const { fetchPostsByTag } = useFetchPostsByTag();
  const { searchPosts } = useSearchPosts();
  const { fetchTags } = useFetchTags();
  const { fetchPosts } = useFetchPosts();

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
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && searchPosts()}
          />
        </div>
      </div>

      <Select
        value={selectedTag}
        onValueChange={value => {
          setSelectedTag(value);
          fetchPostsByTag(value);
          updateURL();
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag, index) => (
            <SelectItem key={index} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={value => setSortOrder(value as 'asc' | 'desc')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
