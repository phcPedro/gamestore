import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Genders } from './entities/genders.entity';
import { Prisma, Userdb } from '@prisma/client';
import { handleError } from '../utils/handle-error.util';
import { notFound } from '../utils/notfound-error';
import { dataTreatment } from 'src/utils/data_treatment';
import { isAdmin } from 'src/utils/admin';

@Injectable()
export class GendersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenderDto, user: Userdb): Promise<Genders> {
    isAdmin(user)
    const data: Prisma.GendersCreateInput = { name: dto.name };

    data.name = await dataTreatment(data.name);

    return this.prisma.genders.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Genders[]> {
    const list = await this.prisma.genders.findMany();

    if (list.length === 0) {
      throw new NotFoundException(
        'Não existem gêneros cadastrados. Que tal cadastrar o primeiro?',
      );
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.genders.findUnique({ where: { id } });

    notFound(record, id);

    return record;
  }

  async update(id: string, dto: UpdateGenderDto, user: Userdb): Promise<Genders> {
    isAdmin(user)
    await this.findOne(id);

    const data: Partial<Genders> = { ...dto };

    data.name = await dataTreatment(data.name);

    return this.prisma.genders
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string, user: Userdb) {
    isAdmin(user)
    await this.findOne(id);

    await this.prisma.genders.delete({
      where: { id },
    });
    throw new HttpException('Genero deletado com sucesso', 204);
  }
}
