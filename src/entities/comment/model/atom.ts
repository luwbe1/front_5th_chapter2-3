import { atom } from 'jotai';
import { Comment } from './type';

export const commentsAtom = atom<Record<number, Comment[]>>({});
export const selectedCommentAtom = atom<Comment | null>(null);

export const newCommentAtom = atom({
  body: '',
  postId: 0,
  userId: 1,
});

export const showAddCommentDialogAtom = atom(false);
export const showEditCommentDialogAtom = atom(false);
