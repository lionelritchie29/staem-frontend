import { Developer } from "./developer";
import { GameImage } from "./game-image";
import { Genre } from "./genre";
import { Publisher } from "./publisher";
import { Tag } from "./tag";

export interface Game {
    id: number
    title: string
    description: string
    price: number
    releasedate: string
    developer: Developer
    publisher: Publisher
    tags: Tag[]
    genres: Genre[]
    images: GameImage[]
}
