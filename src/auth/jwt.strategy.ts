import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { nickname: string }) {
    const user = await this.prisma.userdb.findUnique({
      where: { nickname: payload.nickname },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não existe ou não está autenticado',
      );
    }

    delete user.password,user.createdAt, user.updatedAt, user.cpf;

    return user;
  }
}