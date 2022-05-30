import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MakeUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

   async findById(id: string): Promise<User> {
    const record = await this.prisma.userdb.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`O ID: ${id} não foi encontrado!`);
    }

    return record;
  }

  create(dto: MakeUserDto): Promise<User> {
    const data: User = { ...dto };
    return this.prisma.userdb.create({ data }).catch(this.handleError);

  };

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  findAll(): Promise<User[]> {
    return this.prisma.userdb.findMany();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    const data: Partial<User> = { ...dto };

    return this.prisma.userdb.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.userdb.delete({ where: { id } });
  }

  handleError(error: Error): undefined{
     const errorLines = error.message.split('\n');
     const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
     throw new UnprocessableEntityException(lastErrorLine || "Algum error ocorreu ao executar a operação!");
  }
}
