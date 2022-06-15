import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameprofileDto } from './create-gameprofile.dto';
import {IsBoolean} from 'class-validator';

class FavoriteGame{
  @IsBoolean()
  @ApiProperty({
    description:"Favoritar um game ao perfil.",
    example:true
  })
  favorite: boolean;
}

export class UpdateGameprofileDto extends PartialType(FavoriteGame) {}
