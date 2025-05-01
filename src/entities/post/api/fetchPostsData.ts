import { getPosts } from './api';
import { getUsers } from '@/entities/user/api/api';
import { User } from '@/entities/user/model/type';

export const fetchPostsData = async (limit: number, skip: number) => {
  const postsData = await getPosts(limit, skip);
  const usersData = await getUsers();

  const postsWithUsers = postsData.posts.map(post => ({
    ...post,
    author: usersData.users.find(user => user.id === post.userId) as User,
  }));

  return {
    posts: postsWithUsers,
    total: postsData.total,
  };
};
