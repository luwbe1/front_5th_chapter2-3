import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Button,
} from '@/shared/ui';
import { useCommentState } from '@/entities/comment/model/useCommentState';
import { useUpdateComment } from '../api/useCommentMutation';

export const CommentEditDialog = () => {
  const { mutate: updateComment } = useUpdateComment();
  const {
    showEditCommentDialog,
    setShowEditCommentDialog,
    selectedComment,
    setSelectedComment,
  } = useCommentState();
  if (!selectedComment) return null;

  const handleUpdateComment = () => {
    updateComment(selectedComment, {
      onSuccess: () => {
        setShowEditCommentDialog(false);
      },
    });
  };

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
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
