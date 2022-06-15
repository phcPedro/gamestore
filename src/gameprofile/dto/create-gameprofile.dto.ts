import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";

export class CreateGameprofileDto {
  @IsUUID()
  @ApiProperty({
    description:"Id do game.",
    example:"8e309213-ff85-4ae7-85b8-f74d8607aa0b"
  })
   gameId:string;

   @IsUUID()
   @ApiProperty({
     description:"Id do perfil",
     example:"1790ce55-0594-444d-8ebb-62ea7ef608f1"
   })
   profileId:string;

   @IsBoolean()
   @ApiProperty({
     description:"Favoritar o game.",
     example:true
   })
   favorite: boolean;
}
