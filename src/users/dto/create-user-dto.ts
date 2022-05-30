import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches, MinLength } from "class-validator";


export class MakeUserDto{

id?: string;
@Length(3,15)
@IsString()
@ApiProperty({
  description: "O nome do usuario pode conter no minimo 3 caracteres e no maximo 15.",
  example: "Jordanchristoph"
})
name: string;
@Length(3,15)
@IsString()
@ApiProperty({
  description: "O nickname do usuario pode conter no minimo 3 caracteres e no maximo 15.",
  example: "JordanC92"
})
nickname: string;
@IsEmail()
@ApiProperty({
  description: "coloque seu email completo",
  example: "teste@gmail.com"
})
email: string;
@MinLength(8)
@IsString()
@Matches(/((?=.*\W+))(?![.\n])(?=.*[A-Z]).*$/,{
  message:'Tente uma mistura de caracteres especiais, letras maiusculas e numero para uma senha forte.'
})
@ApiProperty({
  description: "Senha do usuario para afetur o login.",
  example: "123@Teste."
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
