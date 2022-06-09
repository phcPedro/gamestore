import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID, Length } from "class-validator";

export class CreateProfileDto {
@IsString()
@Length(3,15)
@ApiProperty({
  description:"Nome do perfil. Deve conter no minimo 3 caracteres e maximo 10.",
  example:"Lord_Pedro"
})
title: String;

@IsUrl()
@ApiProperty({
  description:"Url para foto do perfil",
  example:"https://avatars.githubusercontent.com/u/68974506?v=4"
})
imageUrl: String;

@IsUUID()
@ApiProperty({
  description:"Id referente ao usuario desse perfil.",
  example:""
})
userId: String;
}
