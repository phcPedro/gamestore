import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {
  @IsString()
  @ApiProperty({
    description:'Nome do gênero de jogos.',
    example:'Plataforma, fantasia'
  })
  name: string;
}
