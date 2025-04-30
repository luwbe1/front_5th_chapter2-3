import { atom } from 'jotai';
import { Post, Tag } from './type';

export const postsAtom = atom<Post[]>([]);
export const totalAtom = atom(0);

export const newPostAtom = atom({
  title: '',
  body: '',
  userId: 1,
});

export const showAddDialogAtom = atom(false);

export const selectedPostAtom = atom<Post | null>(null);
export const showEditDialogAtom = atom(false);

export const showPostDetailDialogAtom = atom(false);

export const tagsAtom = atom<Tag[]>([]);
