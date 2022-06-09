import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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

  create(dto: CreateGenderDto): Promise<Genders> {
    const data: Genders = { ...dto };
    return this.prisma.genders.create({ data }).catch(this.handleError);

  };

  async findOne(id: string): Promise<Genders> {
    return this.findById(id);
  }

  findAll(): Promise<Genders[]> {
    return this.prisma.genders.findMany();
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Genders> {
    await this.findById(id);
    const data: Partial<Genders> = { ...dto };

    return this.prisma.genders.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.genders.delete({ where: { id } });
    throw new HttpException('',204);
  }

  handleError(error: Error): undefined{
     const errorLines = error.message.split('\n');
     const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
     throw new UnprocessableEntityException(lastErrorLine || "Algum error ocorreu ao executar a operação!");
  }
}
