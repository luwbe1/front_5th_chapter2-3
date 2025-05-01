import { Card, CardContent, CardHeader } from '@/shared/ui';
import { PostDialogs } from '@/widgets/post/PostDialogs';
import { PostContent } from '@/widgets/post/PostContent';
import { PostHeader } from '@/widgets/post/PostHeader';

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <PostHeader />
      </CardHeader>
      <CardContent>
        <PostContent />
      </CardContent>
      <PostDialogs />
    </Card>
  );
};

export default PostsManager;
