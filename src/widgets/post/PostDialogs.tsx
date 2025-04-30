import { PostAddDialog } from '@/features/post/ui/PostAddDialog';
import { PostEditDialog } from '@/features/post/ui/PostEditDialog';
import { CommentAddDialog } from '@/features/comment/ui/CommentAddDialog';
import { CommentEditDialog } from '@/features/comment/ui/CommentEditDialog';
import { PostDetailDialog } from '@/features/post/ui/PostDetailDialog';
import { UserInfoDialog } from '@/features/user/ui/UserInfoDialog';

export const PostDialogs = () => {
  return (
    <>
      <PostAddDialog />
      <PostEditDialog />
      <CommentAddDialog />
      <CommentEditDialog />
      <PostDetailDialog />
      <UserInfoDialog />
    </>
  );
};
