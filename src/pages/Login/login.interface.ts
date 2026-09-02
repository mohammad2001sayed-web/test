export interface LoginResponse {
  message: string;
  token: string;
  user?: any;
  data?: {
    token?: string;
  };
}
export interface Data {
  token: string
  tokenType: string
  expiresIn: string
  user: User
}

export interface User {
  _id: string
  name: string
  username: string
  email: string
  photo: string
  cover: string
}
