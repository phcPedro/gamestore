import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Nickname do usuário",
    example:"JordanC92"
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Senha do usuário",
    example:"123@Teste."
  })
 password: string;
}