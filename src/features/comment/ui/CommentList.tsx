import { Button } from '@/shared/ui';
import { ThumbsUp, Edit2, Trash2, Plus } from 'lucide-react';
import { highlightText } from '@/shared/utils/highlightText';
import { Comment } from '@/entities/comment/model/type';
import { useDeleteComment, useLikeComment } from '../api/useCommentMutation';
import { useSetAtom } from 'jotai';
import {
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from '@/entities/comment/model/commentAtoms';

interface CommentsListProps {
  comments: Record<number, Comment[]>;
  postId: number;
  searchQuery: string;
}

// 댓글 렌더링
export const CommentsList = ({
  comments,
  postId,
  searchQuery,
}: CommentsListProps) => {
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: likeComment } = useLikeComment();

  const setNewComment = useSetAtom(newCommentAtom);
  const setShowAddCommentDialog = useSetAtom(showAddCommentDialogAtom);
  const setSelectedComment = useSetAtom(selectedCommentAtom);
  const setShowEditCommentDialog = useSetAtom(showEditCommentDialogAtom);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment(prev => ({ ...prev, postId }));
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map(comment => (
          <div
            key={comment.id}
            className="flex items-center justify-between text-sm border-b pb-1"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">
                {comment.user.username}:
              </span>
              <span className="truncate">
                {highlightText(comment.body, searchQuery)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  likeComment({ id: comment.id, currentLikes: comment.likes })
                }
              >
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment);
                  setShowEditCommentDialog(true);
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteComment({ id: comment.id, postId })}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
