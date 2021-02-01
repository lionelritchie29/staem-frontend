import { Developer } from './developer';
import { GameDiscussion } from './game-discussion';
import { GameImage } from './game-image';
import { GameSale } from './game-sale';
import { GameSystemRequirement } from './game-system-requirement';
import { Genre } from './genre';
import { Publisher } from './publisher';
import { Tag } from './tag';

export interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  releasedate: string;
  developer: Developer;
  publisher: Publisher;
  sale: GameSale;
  tags: Tag[];
  genres: Genre[];
  images: GameImage[];
  systemReq: GameSystemRequirement[];
  topThreeDiscussions: GameDiscussion[];
}
