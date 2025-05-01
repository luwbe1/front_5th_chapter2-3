import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
  Button,
} from '@/shared/ui';
import { usePostState } from '@/entities/post/model/usePostState';
import { useUpdatePost } from '../api/usePostMutation';

export const PostEditDialog = () => {
  const { showEditDialog, setShowEditDialog, selectedPost, setSelectedPost } =
    usePostState();

  const { mutate: updatePost } = useUpdatePost();

  if (!selectedPost) return null;

  const hanldeUpdatePost = () => {
    updatePost(selectedPost, {
      onSuccess: () => {
        setShowEditDialog(false);
      },
    });
  };

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
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
          <Button onClick={hanldeUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
