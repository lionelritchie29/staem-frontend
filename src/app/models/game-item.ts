import { Game } from './game';

export interface GameItem {
  id: number;
  name: string;
  image: string;
  description: string;
  gameItemCategory: number;
  game: number;
}
