import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,
    private readonly jwtService: JwtService){}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const{nickname, password} = loginDto;

    const user = await this.prisma.userdb.findUnique({ where: {nickname}});
     if (!user){
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
     }

     const isHashValid = await bcrypt.compare(password, user.password);

     if(!isHashValid){
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
     }

     delete user.password, user.cpf;

    return{
      token: this.jwtService.sign({nickname}),
      user
    }
  }
}
