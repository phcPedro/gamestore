import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";

export class CreateGameprofileDto {
  @IsUUID()
  @ApiProperty({
    description:"Id do game.",
    example:"c29c586e-7fad-435c-8b5e-5b1c3d897985"
  })
   gameId:string;

   @IsUUID()
   @ApiProperty({
     description:"Id do perfil do usuario.",
     example:""
   })
   profileId:string;

   @IsBoolean()
   @ApiProperty({
     description:"Favoritar o game.",
     example:true
   })
   favorite: boolean;
}
