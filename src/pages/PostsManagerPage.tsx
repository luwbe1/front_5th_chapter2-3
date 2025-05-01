import { Card, CardContent, CardHeader } from '@/shared/ui';
import { PostDialogs } from '@/widgets/post/PostDialogs';
import { PostContent } from '@/widgets/post/PostContent';
import { PostHeader } from '@/widgets/post/PostHeader';
import { useUserModals } from '@/features/user/model/useUserModals';
import { usePostModals } from '@/features/post/model/usePostModals';

const PostsManager = () => {
  const { openUserModal } = useUserModals();
  const { openPostDetail } = usePostModals();

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <PostHeader />
      </CardHeader>
      <CardContent>
        <PostContent
          openUserModal={openUserModal}
          openPostDetail={openPostDetail}
        />
      </CardContent>
      <PostDialogs />
    </Card>
  );
};

export default PostsManager;
