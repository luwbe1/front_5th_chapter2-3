import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Button,
} from '@/shared/ui';
import { useCommentHandlers } from '@/entities/comment/model/useCommentHandlers';

export const CommentEditDialog = () => {
  const {
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
    updateComment,
  } = useCommentHandlers();
  if (!selectedComment) return null;

  return (
    <Dialog
      open={showEditCommentDialog}
      onOpenChange={setShowEditCommentDialog}
    >
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
