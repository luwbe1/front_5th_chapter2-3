import { useSetAtom, useAtom } from 'jotai';
import {
  postsAtom,
  totalAtom,
  loadingAtom,
} from '@/entities/post/model/postAtoms';
import { usePostsQuery } from '../api/usePost';
import { skipAtom, limitAtom } from './atom';
import { useCallback, useEffect } from 'react';

export const useFetchPosts = () => {
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setLoading = useSetAtom(loadingAtom);
  const [skip] = useAtom(skipAtom);
  const [limit] = useAtom(limitAtom);

  const { refetch, isFetching } = usePostsQuery(limit, skip);

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

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
