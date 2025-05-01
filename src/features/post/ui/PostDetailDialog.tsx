import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';
import { highlightText } from '@/shared/utils/highlightText';
import { useAtomValue, useAtom } from 'jotai';
import {
  selectedPostAtom,
  showPostDetailDialogAtom,
} from '@/entities/post/model/postAtoms';
import { searchQueryAtom } from '@/features/post/model/atom';
import { useCommentState } from '@/entities/comment/model/useCommentState';
import { CommentsList } from '@/features/comment/ui/CommentList';

export const PostDetailDialog = () => {
  const selectedPost = useAtomValue(selectedPostAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(
    showPostDetailDialogAtom
  );
  const { comments } = useCommentState();

  if (!selectedPost) return null;

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {highlightText(selectedPost.title, searchQuery)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          <CommentsList
            comments={comments}
            postId={selectedPost.id}
            searchQuery={searchQuery}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
