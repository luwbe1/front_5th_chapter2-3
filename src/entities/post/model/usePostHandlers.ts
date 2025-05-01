import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import {
  postsAtom,
  totalAtom,
  newPostAtom,
  selectedPostAtom,
  showAddDialogAtom,
  showEditDialogAtom,
  tagsAtom,
} from '../model/atom';
import {
  getPosts,
  getPostsByTag,
  getSearchedPosts,
  postCreatePost,
  putUpdatedPost,
  deletePost,
  getTags,
} from '../api/api';
import {
  getUsers, //  추후 분리 예정: User 도메인의 API
} from '../../user/api/api';
import { limitAtom, skipAtom } from '@/features/post/model/atom';

export const usePostHandlers = () => {
  const setPosts = useSetAtom(postsAtom);
  const setTotal = useSetAtom(totalAtom);
  const setTags = useSetAtom(tagsAtom);
  const [newPost, setNewPost] = useAtom(newPostAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);
  const limit = useAtomValue(limitAtom);
  const skip = useAtomValue(skipAtom);

  // 게시물 목록 가져오기
  const fetchPosts = async () => {
    const postsData = await getPosts(limit, skip);
    const usersData = await getUsers();
    const postsWithUsers = postsData.posts.map(post => ({
      ...post,
      author: usersData.users.find(user => user.id === post.userId),
    }));
    setPosts(postsWithUsers);
    setTotal(postsData.total);
  };

  // 태그별 게시물
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === 'all') {
      fetchPosts();
      return;
    }
    const postsData = await getPostsByTag(tag);
    const usersData = await getUsers();
    const postsWithUsers = postsData.posts.map(post => ({
      ...post,
      author: usersData.users.find(user => user.id === post.userId),
    }));
    setPosts(postsWithUsers);
    setTotal(postsData.total);
  };

  // 검색
  const searchPosts = async (query: string) => {
    if (!query) {
      fetchPosts();
      return;
    }
    const data = await getSearchedPosts(query);
    setPosts(data.posts);
    setTotal(data.total);
  };

  // 게시물 추가
  const addPost = async () => {
    const data = await postCreatePost(newPost);
    setPosts(prev => [data, ...prev]);
    setShowAddDialog(false);
    setNewPost({ title: '', body: '', userId: 1 });
  };

  // 게시물 수정
  const updatePost = async () => {
    if (!selectedPost) return;
    const data = await putUpdatedPost(selectedPost);
    setPosts(prev => prev.map(post => (post.id === data.id ? data : post)));
    setShowEditDialog(false);
  };

  // 게시물 삭제
  const deletePostById = async (id: number) => {
    await deletePost(id);
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  // 태그 가져오기
  const fetchTags = async () => {
    const tagsData = await getTags();
    setTags(tagsData);
  };

  return {
    fetchPosts,
    fetchPostsByTag,
    searchPosts,
    addPost,
    updatePost,
    deletePost: deletePostById,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    newPost,
    setNewPost,
    selectedPost,
    setSelectedPost,
    fetchTags,
  };
};
