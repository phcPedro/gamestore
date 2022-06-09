
import { Game } from "src/games/entities/game.entity";

export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  games?:Game
}
