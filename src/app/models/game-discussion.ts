import { PostComment } from './post-comment';
import { UserAccount } from './user-account';

export interface GameDiscussion {
  id: number;
  title: string;
  content: string;
  user: UserAccount;
  gameId: number;
  createdAt: string;
  comments: PostComment[];
}
