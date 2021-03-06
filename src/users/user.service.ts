import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MakeUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { isAdmin } from 'src/utils/isAdmin';
import { notFound } from 'src/utils/notfound-error';
import { handleError } from 'src/utils/handle-error.util';
import { UpdateAdminDto } from './dto/updateadmin-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}



  async create(dto: MakeUserDto){
    if(dto.password !== dto.confirmPassword){
      throw new BadRequestException('As senhas não coincidem! As senhas precisam ser iguais.');
    }

    delete dto.confirmPassword;

    const data:  Prisma.UserdbCreateInput = {
      name: dto.name,
      cpf: dto.cpf,
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      nickname: dto.nickname
    };

    return this.prisma.user.create({
        data,
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          isAdmin: true,
        },
      }).catch.handleError;
  }



  async findOne(user: User, id: string) {
    isAdmin(user);

    const record = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        isAdmin: true,
        profiles: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
            games: {
              select: {
                id: true,
                gameId: true,
                favorite: true,
                game: {
                  select: {
                    title: true,
                    _count: { select: { profiles: true } },
                  },
                },
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    notFound(record, id);

    return record;
  }

  async findAll(user: User) {
    isAdmin(user);

    const list = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        isAdmin: true,
        profiles: {
          select: {
            id: true,
            _count: { select: { games: true } },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async takeAuth(user: User, dto: UpdateAdminDto, id: string) {
    isAdmin(user);

    await this.findOne(user, id);

    const data: Partial<User> = { ...dto };

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          cpf: true,
          email: true,
          isAdmin: true,
          _count: { select: { profiles: true } },
          createdAt: true,
          updatedAt: true,
        },
      })
      .catch(handleError);
  }

  async remove(user: User, id: string) {
    await this.findOne(user, id);

    await this.prisma.user.delete({
      where: { id },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }
  async myAccount(userId: string) {
    const record = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        isAdmin: true,
        profiles: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            _count: { select: { games: true } },
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return record;
  }

  async update(userId: string, dto: UpdateUserDto) {
    await this.myAccount(userId);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id: userId },
        data,
        select: {
          id: true,
          name: true,
          cpf: true,
          email: true,
          isAdmin: true,
          _count: { select: { profiles: true } },
          createdAt: true,
          updatedAt: true,
        },
      })
      .catch(handleError);
  }

  async delete(userId: string) {
    await this.myAccount(userId);

    await this.prisma.user.delete({
      where: { id: userId },
    });
    throw new HttpException('Excluido com exito', 204);
  }


}
