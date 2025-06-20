import { getPostsByTag } from './api';
import { getUsers } from '@/entities/user/api/api';
import { User } from '@/entities/user/model/type';

export const fetchPostsByTagData = async (tag: string) => {
  const [postsData, usersData] = await Promise.all([
    getPostsByTag(tag),
    getUsers(),
  ]);

  const postsWithUsers = postsData.posts.map(post => ({
    ...post,
    author: usersData.users.find(user => user.id === post.userId) as User,
  }));

  return {
    posts: postsWithUsers,
    total: postsData.total,
  };
};
