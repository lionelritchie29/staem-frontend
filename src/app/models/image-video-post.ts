import { UserAccount } from './user-account';

export interface ImageVideoPost {
  id: number;
  fileUrl: string;
  type: string;
  description: string;
  likeCount: number;
  dislikeCount: number;
  user: UserAccount;
  createdAt: string;
}
