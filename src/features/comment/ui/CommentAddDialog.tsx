import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Button,
} from '@/shared/ui';
import { useCommentState } from '@/entities/comment/model/useCommentState';
import { useAddComment } from '../api/useCommentMutation';

export const CommentAddDialog = () => {
  const { mutate: addComment } = useAddComment();

  const {
    showAddCommentDialog,
    setShowAddCommentDialog,
    newComment,
    setNewComment,
  } = useCommentState();

  const handleAddComment = () => {
    addComment(newComment, {
      onSuccess: () => {
        setShowAddCommentDialog(false);
        setNewComment({ body: '', postId: 0, userId: 1 });
      },
    });
  };

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
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
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
