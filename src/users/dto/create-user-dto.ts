import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class MakeUserDto{
@Length(2,15)
@ApiProperty({
  description: "O nome do usuario pode conter no minimo 3 caracteres e no maximo 15.",
  example: "Jordanchristoph"
})

name: string
}
