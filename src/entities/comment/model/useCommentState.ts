import { useAtom, useAtomValue } from 'jotai';
import {
  commentsAtom,
  selectedCommentAtom,
  newCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from './commentAtoms';

export const useCommentState = () => {
  const comments = useAtomValue(commentsAtom);
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom);
  const [newComment, setNewComment] = useAtom(newCommentAtom);
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(
    showAddCommentDialogAtom
  );
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(
    showEditCommentDialogAtom
  );

  return {
    comments,
    selectedComment,
    newComment,
    setNewComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    showAddCommentDialog,
    showEditCommentDialog,
  };
};
