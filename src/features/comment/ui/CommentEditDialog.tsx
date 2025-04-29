import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Button,
} from '../../../shared/ui';
import { Comment } from '../../../entities/comment/model/type';

interface CommentEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedComment: Comment | null;
  setSelectedComment: (comment: Comment) => void;
  updateComment: () => void;
}

export const CommentEditDialog = ({
  open,
  onOpenChange,
  selectedComment,
  setSelectedComment,
  updateComment,
}: CommentEditDialogProps) => {
  if (!selectedComment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment.body}
            onChange={e =>
              setSelectedComment({ ...selectedComment, body: e.target.value })
            }
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
