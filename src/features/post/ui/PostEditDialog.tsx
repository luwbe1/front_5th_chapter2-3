import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
  Button,
} from '../../../shared/ui';
import { Post } from '../../../entities/post/model/type';

interface PostEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post) => void;
  updatePost: () => void;
}

export const PostEditDialog = ({
  open,
  onOpenChange,
  selectedPost,
  setSelectedPost,
  updatePost,
}: PostEditDialogProps) => {
  if (!selectedPost) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost.title}
            onChange={e =>
              setSelectedPost({ ...selectedPost, title: e.target.value })
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost.body}
            onChange={e =>
              setSelectedPost({ ...selectedPost, body: e.target.value })
            }
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
