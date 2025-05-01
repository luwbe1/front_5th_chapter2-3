import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAtom } from 'jotai';
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from '@/features/post/model/atom';

export const useUpdateURL = () => {
  const navigate = useNavigate();
  const [skip] = useAtom(skipAtom);
  const [limit] = useAtom(limitAtom);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [sortBy] = useAtom(sortByAtom);
  const [sortOrder] = useAtom(sortOrderAtom);
  const [selectedTag] = useAtom(selectedTagAtom);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`?${params.toString()}`);
  }, [navigate, skip, limit, searchQuery, sortBy, sortOrder, selectedTag]);

  return { updateURL };
};
