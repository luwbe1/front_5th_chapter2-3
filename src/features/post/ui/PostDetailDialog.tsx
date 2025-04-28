import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui';
import { highlightText } from '../../../shared/utils/highlightText';

interface PostDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPost: any | null;
  searchQuery: string;
  CommentsListComponent: React.ComponentType<{ postId: number }>;
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  selectedPost,
  searchQuery,
  CommentsListComponent,
}: PostDetailDialogProps) => {
  if (!selectedPost) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost.title, searchQuery)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          <CommentsListComponent postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
