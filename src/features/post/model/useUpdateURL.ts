import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
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
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const sortBy = useAtomValue(sortByAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const selectedTag = useAtomValue(selectedTagAtom);

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
