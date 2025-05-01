import { TableRow, TableCell, Button } from '@/shared/ui';
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Edit2,
  Trash2,
} from 'lucide-react';
import { highlightText } from '@/shared/utils/highlightText';
import { Post } from '@/entities/post/model/type';
import { useAtomValue } from 'jotai';
import { searchQueryAtom } from '../model/atom';
import { useUserModals } from '@/features/user/model/useUserModals';
import { usePostModals } from '../model/usePostModals';

interface PostRowProps {
  post: Post;
  selectedTag: string;
  onTagClick: (tag: string) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
}

export const PostTableRow = ({
  post,
  selectedTag,
  onTagClick,
  onEdit,
  onDelete,
}: PostRowProps) => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const { openUserModal } = useUserModals();
  const { openPostDetail } = usePostModals();

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map(tag => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? 'text-white bg-blue-500 hover:bg-blue-600'
                    : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                }`}
                onClick={() => onTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => post.author && openUserModal(post.author)}
        >
          <img
            src={post.author?.image}
            alt={post.author?.username}
            className="w-8 h-8 rounded-full"
          />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openPostDetail(post)}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
