import { ApiProperty } from "@nestjs/swagger";


export class MakeUserDto{
@ApiProperty({
  description: "O nome do usuario pode conter no minimo 3 caracteres e no maximo 15.",
  example: "Jordanchristoph"
})
id?: string;
name: string;
nickname: string;
email: string;
password: string;
cpf: string;
createdAt?: Date;
updatedAt?: Date;
}
