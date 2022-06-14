import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/isAdmin';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Genders } from './entities/genders.entity';

@Injectable()
export class GendersService {

  constructor(private readonly prisma: PrismaService) {}

   async findById(id: string): Promise<Genders> {
    const record = await this.prisma.genders.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`O ID: ${id} não foi encontrado!`);
    }

    return record;
  }

  async create(user: User, dto: CreateGenderDto): Promise<Genders> {
    isAdmin(user);
    const data: Prisma.GendersCreateInput = { name: dto.name };
    data.name = this.dataTreatment(data.name);

    return this.prisma.genders.create({ data }).catch(handleError);
  };

  async findOne(name: string) {
    name = this.dataTreatment(name);
    const record = await this.prisma.genders.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        games: { include: { gender: { select: { name: true } } } },
      },
    });
    if (!record) {
      throw new NotFoundException(`Gênero não encontrado.`);
    }

    return record;
  }
  async findAll(): Promise<Genders[]> {
    const list = await this.prisma.genders.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            games: true,
          },
        },
      },
    });

    if (list.length === 0) {
      throw new NotFoundException('Não existem gêneros cadastrados.');
    }
    return list;
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Genders> {
    await this.findById(id);
    const data: Partial<Genders> = { ...dto };

    return this.prisma.genders.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }

  async delete(user: User, name: string) {
    isAdmin(user);

    await this.findOne(name);

    await this.prisma.genders.delete({
      where: { name },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }
  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
  handleError(error: Error): undefined{
     const errorLines = error.message.split('\n');
     const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
     throw new UnprocessableEntityException(lastErrorLine || "Algum error ocorreu ao executar a operação!");
  }
}
