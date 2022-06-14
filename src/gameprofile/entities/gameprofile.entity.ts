import { Profile } from "@prisma/client";
import { Game } from "src/games/entities/game.entity";

export class Gameprofile {
  gameId:Game;
  profileId:Profile;
  favorite: boolean;
}
