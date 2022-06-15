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
import { isAdmin } from 'src/utils/admin';
import { notFound } from 'src/utils/notfound-error';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()


export class UserService {
  private findById = {
    id: true,
    name: true,
    nickname: true,
    email: true,
    password: false,
    isAdmin: true,
    cpf: true,
    createdAt: true,
    updatedAt: true,
    }
  constructor(private readonly prisma: PrismaService) {}

  async myAccount(userId: string) {
    const record = await this.prisma.userdb.findUnique({
      where: { id: userId },
      select: this.findById,
    });

    return record;
  }

  async create(dto: MakeUserDto): Promise<User> {
    if(dto.password !== dto.confirmPassword){
      throw new BadRequestException('As senhas não coincidem! As senhas precisam ser iguais.');
    }

    delete dto.confirmPassword;

    const data: User = { ...dto, password: await bcrypt.hash(dto.password, 10) };

    return this.prisma.userdb.create({ data }).catch(handleError);
  }

  async findOne(id: string, user:User){
    isAdmin(user);
    const record = await this.prisma.userdb.findUnique({
      where: {id},
      select: this.findById,
    });

    notFound(record, id);
    return record;
  }

  async findAll(user: User){
    isAdmin(user);
    const list = await this.prisma.userdb.findMany({
      select: this.findById,
    })
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User> {
     await this.myAccount(userId);

    if(dto.password){
      if (dto.password != dto.confirmPassword){
        throw new BadRequestException('As senhas não coincidem! As senhas precisam ser iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if(data.password){
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.userdb
      .update({
        where: { id: userId },
        data,
      })
      .catch(handleError);
  }

  async delete(iduser: string) {
    await this.myAccount(iduser);

    await this.prisma.userdb.delete({ where: { id: iduser } });
    throw new HttpException('Deletado com exito!', 204);
  }

  async deleteUser(id: string, user:User) {
    isAdmin(user)
    await this.findOne(id, user);

    await this.prisma.userdb.delete({
      where: { id },
    });
    throw new HttpException('Usuário deletado com sucesso', 204);
  }

}
