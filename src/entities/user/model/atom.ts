import { atom } from 'jotai';
import type { User } from './type';

export const selectedUserAtom = atom<User | null>(null);
export const showUserModalAtom = atom(false);
