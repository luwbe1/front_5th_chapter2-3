import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Button,
} from '../../../shared/ui';
import { CreateCommentRequest } from '../../../entities/comment/model/type';

interface CommentAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newComment: { body: string; postId: number; userId: number };
  setNewComment: (comment: CreateCommentRequest) => void;
  addComment: () => void;
}

export const CommentAddDialog = ({
  open,
  onOpenChange,
  newComment,
  setNewComment,
  addComment,
}: CommentAddDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={e =>
              setNewComment({ ...newComment, body: e.target.value })
            }
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
