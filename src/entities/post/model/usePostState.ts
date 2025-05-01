import { useAtom } from 'jotai';
import {
  newPostAtom,
  selectedPostAtom,
  showAddDialogAtom,
  showEditDialogAtom,
} from './postAtoms';

export const usePostState = () => {
  const [newPost, setNewPost] = useAtom(newPostAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom);

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    newPost,
    setNewPost,
    selectedPost,
    setSelectedPost,
  };
};
