import { User } from '@/entities/user/model/type';

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  view: number;
  userId: number;
  author?: User;
}

interface Reactions {
  likes: number;
  dislikes: number;
}

export interface FetchPostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export type FetchTagsResponse = Tag[];

export interface Tag {
  slug: string;
  name: string;
  url: string;
}
