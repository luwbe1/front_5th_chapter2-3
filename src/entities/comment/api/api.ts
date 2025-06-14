import { fetchInstance } from '@/shared/lib/fetchInstance';
import {
  FetchCommentsResponse,
  Comment,
  CreateCommentRequest,
} from '../model/type';

// 댓글 가져오기
export const getComments = (postId: number) => {
  return fetchInstance<FetchCommentsResponse>(`comments/post/${postId}`);
};

// 댓글 추가
export const postCreateComment = (newComment: CreateCommentRequest) => {
  return fetchInstance<Comment>('/comments/add', {
    method: 'POST',
    body: JSON.stringify(newComment),
  });
};

// 댓글 수정
export const putUpdateComment = (id: number, body: string) => {
  return fetchInstance<Comment>(`comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ body }),
  });
};

//댓글 삭제
export const deleteComment = (id: number) => {
  return fetchInstance<null>(`comments/${id}`, {
    method: 'DELETE',
  });
};

// 댓글 좋아요
export const patchLikeComment = (id: number, likes: number) => {
  return fetchInstance<Comment>(`comments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ likes }),
  });
};
