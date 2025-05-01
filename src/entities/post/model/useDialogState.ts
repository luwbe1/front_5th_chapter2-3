import { useAtom } from 'jotai';
import { showAddDialogAtom, showEditDialogAtom } from './postAtoms';

export const useDialogState = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
  };
};
