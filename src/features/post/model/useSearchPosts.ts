import { useCallback } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { getSearchedPosts } from '@/entities/post/api/api';
import {
  postsAtom,
  totalAtom,
  loadingAtom,
} from '@/entities/post/model/postAtoms';
import { searchQueryAtom } from '@/features/post/model/atom';
import { useFetchPosts } from './useFetchPosts';

export const useSearchPosts = () => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setLoading = useSetAtom(loadingAtom);
  const { fetchPosts } = useFetchPosts();

  const { refetch } = useQuery({
    queryKey: ['posts', 'search', searchQuery],
    queryFn: () => getSearchedPosts(searchQuery),
    enabled: false,
    staleTime: 1000 * 60,
  });

  const searchPosts = useCallback(async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }

    setLoading(true);
    try {
      const result = await refetch();
      if (result.data) {
        setPosts(result.data.posts);
        setTotal(result.data.total);
      }
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    }
    setLoading(false);
  }, [searchQuery, fetchPosts, refetch, setLoading, setPosts, setTotal]);

  return { searchPosts };
};
