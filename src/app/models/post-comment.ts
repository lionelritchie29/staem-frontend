import { UserAccount } from './user-account';

export interface PostComment {
  postId: number;
  user: UserAccount;
  comment: string;
  createdAt: string;
}
