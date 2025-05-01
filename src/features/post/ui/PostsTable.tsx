import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/shared/ui';
import { PostTableRow } from './PostTableRow';
import { Post } from '@/entities/post/model/type';
import { User } from '@/entities/user/model/type';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  postsAtom,
  selectedPostAtom,
  showEditDialogAtom,
} from '@/entities/post/model/postAtoms';
import { selectedTagAtom } from '../model/atom';
import { useUpdateURL } from '../model/useUpdateURL';
import { useDeletePost } from '../api/usePostMutation';

interface PostTableProps {
  openUserModal: (user?: User) => void;
  openPostDetail: (post: Post) => void;
}

export const PostsTable = ({
  openUserModal,
  openPostDetail,
}: PostTableProps) => {
  const posts = useAtomValue(postsAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const setSelectedPost = useSetAtom(selectedPostAtom);
  const setShowEditDialog = useSetAtom(showEditDialogAtom);
  const { mutate: deletePost } = useDeletePost();
  const { updateURL } = useUpdateURL();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map(post => (
          <PostTableRow
            key={post.id}
            post={post}
            selectedTag={selectedTag}
            onTagClick={tag => {
              setSelectedTag(tag);
              updateURL();
            }}
            openUserModal={openUserModal}
            openPostDetail={openPostDetail}
            onEdit={post => {
              setSelectedPost(post);
              setShowEditDialog(true);
            }}
            onDelete={deletePost}
          />
        ))}
      </TableBody>
    </Table>
  );
};
