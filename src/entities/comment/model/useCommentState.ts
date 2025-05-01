import { useAtom, useAtomValue } from 'jotai';
import {
  commentsAtom,
  selectedCommentAtom,
  newCommentAtom,
} from './commentAtoms';

export const useCommentState = () => {
  const comments = useAtomValue(commentsAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);

  return {
    comments,
    selectedComment,
    newComment,
    setNewComment,
    setSelectedComment,
  };
};
