import { useAtomValue, useSetAtom } from 'jotai';
import {
  postsAtom,
  totalAtom,
  loadingAtom,
} from '@/entities/post/model/postAtoms';
import { useFetchPosts } from '@/features/post/model/useFetchPosts';
import { usePostsByTagQuery } from '../api/usePostsByTag';
import { selectedTagAtom } from './atom';
import { useCallback } from 'react';

export const useFetchPostsByTag = () => {
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setLoading = useSetAtom(loadingAtom);
  const { fetchPosts } = useFetchPosts();
  const selectedTag = useAtomValue(selectedTagAtom);

  const { refetch } = usePostsByTagQuery(selectedTag);

  const fetchPostsByTag = useCallback(
    async (tag: string) => {
      setLoading(true);

      if (!tag || tag === 'all') {
        fetchPosts();
        return;
      }

      try {
        const { data } = await refetch();
        if (data) {
          setPosts(data.posts);
          setTotal(data.total);
        }
      } catch (error) {
        console.error('태그별 게시물 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    },
    [refetch, setLoading, setPosts, setTotal, fetchPosts]
  );

  return { fetchPostsByTag };
};
