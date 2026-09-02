import type { Pagination, TopComment2 } from "../Post/Post.interface"

export interface PostDetailsRisponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  post: Post
}

export interface Post {
  _id: string
  body: string
  image: string
  privacy: string
  user: User
  sharedPost: any
  likes: any[]
  createdAt: string
  commentsCount: number
  topComment: any
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}


export interface CommentsResponse {
  success: boolean;
  message: string;
  data: {
    comments: TopComment2[];
  };
  meta: {
    pagination: Pagination;
  };
}
