import { getTags } from '@/entities/post/api/api';
import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { tagsAtom } from '@/entities/post/model/postAtoms';

export const useFetchTags = () => {
  const setTags = useSetAtom(tagsAtom);

  // 태그 가져오기
  const fetchTags = useCallback(async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  }, [setTags]);

  return { fetchTags };
};
