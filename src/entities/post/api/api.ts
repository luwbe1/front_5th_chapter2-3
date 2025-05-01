import { fetchInstance } from '@/shared/lib/fetchInstance';
import { FetchPostsResponse, FetchTagsResponse, Post } from '../model/type';

export const getPosts = (limit: number, skip: number) => {
  return fetchInstance<FetchPostsResponse>(`posts?limit=${limit}&skip=${skip}`);
};

export const getTags = () => {
  return fetchInstance<FetchTagsResponse>('posts/tags');
};

export const getSearchedPosts = (query: string) => {
  return fetchInstance<FetchPostsResponse>(`posts/search?q=${query}`);
};

export const getPostsByTag = (tag: string) => {
  return fetchInstance<FetchPostsResponse>(`posts/tag/${tag}`);
};

export const postCreatePost = (
  newPost: Pick<Post, 'body' | 'title' | 'userId'>
) => {
  return fetchInstance<Post>('posts/add', {
    method: 'POST',
    body: JSON.stringify(newPost),
  });
};

export const putUpdatedPost = (
  updatedPost: Pick<Post, 'id' | 'title' | 'body' | 'userId'>
) => {
  return fetchInstance<Post>(`posts/${updatedPost.id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedPost),
  });
};

export const deletePost = (id: number) => {
  return fetchInstance(`posts/${id}`, {
    method: 'DELETE',
  });
};
