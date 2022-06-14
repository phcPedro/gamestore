import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameprofileDto } from './create-gameprofile.dto';
import {IsBoolean} from 'class-validator';

class FavoriteGame{
  @IsBoolean()
  @ApiProperty({
    description:"Favoritar perfil.",
    example:true
  })
  favorite: boolean;
}

export class UpdateGameprofileDto extends PartialType(FavoriteGame) {}
