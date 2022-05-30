import { ApiProperty } from "@nestjs/swagger";


export class MakeUserDto{

id?: string;
@ApiProperty({
  description: "O nome do usuario pode conter no minimo 3 caracteres e no maximo 15.",
  example: "Jordanchristoph"
})
name: string;
@ApiProperty({
  description: "O nickname do usuario pode conter no minimo 3 caracteres e no maximo 15.",
  example: "JordanC92"
})
nickname: string;
@ApiProperty({
  description: "coloque seu email completo",
  example: "teste@gmail.com"
})
email: string;
@ApiProperty({
  description: "Senha",
  example: "123"
})
password: string;
@ApiProperty({
  description: "Coloque seu cpf, sem ponto ou traço só numeros.",
  example: "12312312312"
})
cpf: string;
createdAt?: Date;
updatedAt?: Date;
}
