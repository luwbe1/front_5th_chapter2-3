import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { CommentsList } from '@/features/comment/ui/CommentList';
import { UserInfoDialog } from '@/features/user/ui/UserInfoDialog';
import { PostDetailDialog } from '@/features/post/ui/PostDetailDialog';
import { CommentEditDialog } from '@/features/comment/ui/CommentEditDialog';
import { CommentAddDialog } from '@/features/comment/ui/CommentAddDialog';
import { PostEditDialog } from '@/features/post/ui/PostEditDialog';
import { PostAddDialog } from '@/features/post/ui/PostAddDialog';
import { PostContent } from '@/widgets/post/PostContent';
import { getTags } from '@/entities/post/api/api';
import { Post } from '@/entities/post/model/type';
import { User } from '@/entities/user/model/type';
import { getUser } from '@/entities/user/api/api';
import { useAtom } from 'jotai';
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from '@/features/post/model/atom';
import {
  showAddDialogAtom,
  selectedPostAtom,
  showPostDetailDialogAtom,
  tagsAtom,
} from '@/entities/post/model/atom';
import {
  selectedUserAtom,
  showUserModalAtom,
} from '@/entities/user/model/atom';
import { usePostHandlers } from '@/entities/post/model/usePostHandlers';
import { useCommentHandlers } from '@/entities/comment/model/useCommentHandlers';

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { fetchPosts, fetchPostsByTag } = usePostHandlers();
  const {
    fetchComments,
    deleteComments,
    likeComment,
    comments,
    setNewComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
  } = useCommentHandlers();

  // 상태 관리
  const [skip, setSkip] = useAtom(skipAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom);
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom);
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(
    showPostDetailDialogAtom
  );
  const [tags, setTags] = useAtom(tagsAtom);

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const tagsData = await getTags();
      setTags(tagsData);
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await getUser(user.id);
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get('skip') || '0'));
    setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder((params.get('sortOrder') as 'asc' | 'desc') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [location.search]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <PostContent
          openUserModal={openUserModal}
          openPostDetail={openPostDetail}
        />
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        selectedPost={selectedPost}
        searchQuery={searchQuery}
        CommentsListComponent={({ postId }) => (
          <CommentsList
            comments={comments}
            postId={postId}
            searchQuery={searchQuery}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            likeComment={likeComment}
            deleteComment={deleteComments}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
          />
        )}
      />

      {/* 사용자 모달 */}
      <UserInfoDialog
        open={showUserModal}
        onOpenChange={setShowUserModal}
        selectedUser={selectedUser}
      />
    </Card>
  );
};

export default PostsManager;
