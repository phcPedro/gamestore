import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, IsUUID, Length } from "class-validator";

export class CreateProfileDto {
@IsString()
@Length(3,15)
@ApiProperty({
  description:"Nome do perfil. Deve conter no minimo 3 caracteres e maximo 10.",
  example:"Lord_Pedro"
})
title: string;

@IsUrl()
@ApiProperty({
  description:"Url para foto do perfil",
  example:"https://avatars.githubusercontent.com/u/68974506?v=4"
})
imageUrl: string;

@IsUUID()
@ApiProperty({
  description:"Id referente ao usuario desse perfil.",
  example:"4c5833ac-1ebe-4d3e-8f93-a54427729017"
})
userId: string;
}
