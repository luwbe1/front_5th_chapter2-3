import { useSetAtom, useAtomValue } from 'jotai';
import {
  postsAtom,
  totalAtom,
  loadingAtom,
} from '@/entities/post/model/postAtoms';
import { usePostsQuery } from '../api/usePost';
import { skipAtom, limitAtom } from './atom';
import { useCallback } from 'react';

export const useFetchPosts = () => {
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setLoading = useSetAtom(loadingAtom);
  const skip = useAtomValue(skipAtom);
  const limit = useAtomValue(limitAtom);

  const { refetch } = usePostsQuery(limit, skip);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await refetch().then(r => r.data);
      if (res) {
        setPosts(res.posts);
        setTotal(res.total);
      }
    } catch (e) {
      console.error('게시물 가져오기 오류:', e);
    } finally {
      setLoading(false);
    }
  }, [refetch, setLoading, setPosts, setTotal]);
  return { fetchPosts };
};
