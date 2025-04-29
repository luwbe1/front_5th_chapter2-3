export interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
}

export interface CommentUser {
  id: number;
  username: string;
  fullName: string;
}

export interface FetchCommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateCommentRequest {
  body: string;
  postId: number;
  userId: number;
}
