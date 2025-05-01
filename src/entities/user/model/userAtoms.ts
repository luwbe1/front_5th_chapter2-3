import { atom } from 'jotai';
import { User } from './type';

export const selectedUserAtom = atom<User | null>(null);
export const showUserModalAtom = atom(false);
