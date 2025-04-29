import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../shared/ui';
import { CommentsList } from '../features/comment/ui/CommentList';
import { UserInfoDialog } from '../features/user/ui/UserInfoDialog';
import { PostDetailDialog } from '../features/post/ui/PostDetailDialog';
import { CommentEditDialog } from '../features/comment/ui/CommentEditDialog';
import { CommentAddDialog } from '../features/comment/ui/CommentAddDialog';
import { PostEditDialog } from '../features/post/ui/PostEditDialog';
import { PostAddDialog } from '../features/post/ui/PostAddDialog';
import { PostPagination } from '../features/post/ui/PaginationControls';
import { PostTable } from '../features/post/ui/PostTable';
import { PostFilters } from '../features/post/ui/PostsFilter';
import {
  getPosts,
  getTags,
  getSearchedPosts,
  getPostsByTag,
  postCreatePost,
  putUpdatedPost,
  deletePost,
} from '../entities/post/api/api';
import { Tag, Post } from '../entities/post/model/type';
import { User } from '../entities/user/model/type';
import { getUsers, getUser } from '../entities/user/api/api';
import {
  getComments,
  postCreateComment,
  putUpdateComment,
  deleteComment,
  patchLikeComment,
} from '../entities/comment/api/api';
import { Comment } from '../entities/comment/model/type';

const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(parseInt(queryParams.get('skip') || '0'));
  const [limit, setLimit] = useState(
    parseInt(queryParams.get('limit') || '10')
  );
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get('search') || ''
  );
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(
    queryParams.get('sortOrder') || 'asc'
  );
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', userId: 1 });
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState(queryParams.get('tag') || '');
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [newComment, setNewComment] = useState({
    body: '',
    postId: 0,
    userId: 1,
  });
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false);
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  // 게시물 가져오기
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const postsData = await getPosts(limit, skip);
      const usersData = await getUsers();

      const postsWithUsers = postsData.posts.map(post => ({
        ...post,
        author: usersData.users.find(user => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error('게시물 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
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

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const data = await getSearchedPosts(searchQuery);
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === 'all') {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsData, usersData] = await Promise.all([
        getPostsByTag(tag),
        getUsers(),
      ]);

      const postsWithUsers = postsData.posts.map(post => ({
        ...post,
        author: usersData.users.find(user => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    }
    setLoading(false);
  };

  // 게시물 추가
  const addPost = async () => {
    try {
      const data = await postCreatePost(newPost);
      setPosts(prev => [data, ...prev]);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) {
      return;
    }

    try {
      const data = await putUpdatedPost(selectedPost);

      setPosts(posts.map(post => (post.id === data.id ? data : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  // 게시물 삭제
  const deletePosts = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await postCreateComment(newComment);
      setComments(prev => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data as Comment],
      }));
      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: 0, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) {
      return;
    }
    try {
      const data = await putUpdateComment(
        selectedComment.id,
        selectedComment.body
      );
      setComments(prev => ({
        ...prev,
        [data.postId]: prev[data.postId].map(comment =>
          comment.id === data.id ? data : comment
        ),
      }));
      setShowEditCommentDialog(false);
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

  // 댓글 삭제
  const deleteComments = async (id: number, postId: number) => {
    try {
      await deleteComment(id); // 분리한 API 호출 사용
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(comment => comment.id !== id),
      }));
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const currentLikes = comments[postId]?.find(c => c.id === id)?.likes ?? 0;
      const data = await patchLikeComment(id, currentLikes + 1);
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].map(comment =>
          comment.id === data.id
            ? { ...data, likes: comment.likes + 1 }
            : comment
        ),
      }));
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
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
    setSortOrder(params.get('sortOrder') || 'asc');
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
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchPosts={searchPosts}
            tags={tags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            fetchPostsByTag={fetchPostsByTag}
            updateURL={updateURL}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              openUserModal={openUserModal}
              openPostDetail={openPostDetail}
              setSelectedPost={setSelectedPost}
              setShowEditDialog={setShowEditDialog}
              deletePost={deletePosts}
            />
          )}

          {/* 페이지네이션 */}
          <PostPagination
            skip={skip}
            limit={limit}
            total={total}
            setSkip={setSkip}
            setLimit={setLimit}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostAddDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        newPost={newPost}
        setNewPost={setNewPost}
        addPost={addPost}
      />

      {/* 게시물 수정 대화상자 */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={addComment}
      />

      {/* 댓글 수정 대화상자 */}
      <CommentEditDialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        updateComment={updateComment}
      />

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
