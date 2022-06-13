import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Nickname do usuário",
    example:"pedrohenrique"
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:"Senha do usuário",
    example:"Pedro123@"
  })
 password: string;
}