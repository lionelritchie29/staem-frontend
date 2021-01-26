import { Game } from './game';

export interface UserWishlist {
  userId: number;
  game: Game;
  createdAt: string;
}
