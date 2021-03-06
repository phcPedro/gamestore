import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, IsUrl, Length } from "class-validator";

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description:'Titulo do game.',
    example:'Castlevania Symphony of the Night'
})
 title: string;

 @IsString()
 @ApiProperty({
   description:'Gênero do jogo.',
   example:'Metroidvania',
})
gender: string;

  @IsUrl()
  @ApiProperty({
    description:'Url da imagem do jogo.',
    example:'https://upload.wikimedia.org/wikipedia/pt/e/e0/Castlevania_Symphony_of_the_Night_Capa.jpg'
})
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description:'Descrição do game.',
    example:'Castlevania: Symphony of the Night é um jogo de ação-aventura 2D desenvolvido e distribuído pela Konami em 1997. Ele é o 13º título da série Castlevania, sendo o primeiro a ser lançado para o console PlayStation e a sequência cronológica de Castlevania: Rondo of Blood'
})
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description:'Ano em que o jogo foi lançado.',
    example:1997
})
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description:'IMDB do game.',
    example:5
})
  imdScore: number;

  @IsUrl()
  @ApiProperty({
    description:'Url para o trailer do game.',
    example:'https://youtu.be/wDE34DggEw4'
})
  trailerYoutubeUrl: string;


@IsUrl()
@ApiProperty({
  description:'Url para uma gameplay do game.',
  example:'https://youtu.be/axcmkEX7v3I'
})
  gamePlayYoutubeUrl: string;

}
