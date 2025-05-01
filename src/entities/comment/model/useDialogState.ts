import { useAtom } from 'jotai';
import {
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from './commentAtoms';

export const useDialogState = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(
    showAddCommentDialogAtom
  );
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(
    showEditCommentDialogAtom
  );

  return {
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    showAddCommentDialog,
    showEditCommentDialog,
  };
};
