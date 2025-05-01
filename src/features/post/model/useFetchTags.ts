import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { tagsAtom } from '@/entities/post/model/postAtoms';
import { useTagsQuery } from '../api/useTags';

export const useFetchTags = () => {
  const setTags = useSetAtom(tagsAtom);
  const { refetch } = useTagsQuery();

  // 태그 가져오기
  const fetchTags = useCallback(async () => {
    try {
      const { data } = await refetch();
      if (data) {
        setTags(data);
      }
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  }, [refetch, setTags]);

  return { fetchTags };
};
