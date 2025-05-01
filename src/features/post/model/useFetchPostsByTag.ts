import { fetchPostsByTagData } from '@/entities/post/api/fetchPostsByTag';
import { useSetAtom } from 'jotai';
import {
  postsAtom,
  totalAtom,
  loadingAtom,
} from '@/entities/post/model/postAtoms';
import { useCallback } from 'react';
import { useFetchPosts } from '@/features/post/model/useFetchPosts';

export const useFetchPostsByTag = () => {
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setLoading = useSetAtom(loadingAtom);
  const { fetchPosts } = useFetchPosts();

  const fetchPostsByTag = useCallback(
    async (tag: string) => {
      if (!tag || tag === 'all') {
        fetchPosts();
        return;
      }

      setLoading(true);
      try {
        const { posts, total } = await fetchPostsByTagData(tag);
        setPosts(posts);
        setTotal(total);
      } catch (error) {
        console.error('태그별 게시물 가져오기 오류:', error);
      }
      setLoading(false);
    },
    [fetchPosts, setLoading, setPosts, setTotal]
  );

  return { fetchPostsByTag };
};
