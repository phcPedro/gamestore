import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

   async findById(id: string): Promise<Game> {
    const record = await this.prisma.gamesdb.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`O ID: ${id} não foi encontrado!`);
    }

    return record;
  }

  create(dto: CreateGameDto): Promise<Game> {
    const data: Game = { ...dto };
    return this.prisma.gamesdb.create({ data }).catch(this.handleError);

  };

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  findAll(): Promise<Game[]> {
    return this.prisma.gamesdb.findMany();
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);
    const data: Partial<Game> = { ...dto };

    return this.prisma.gamesdb.update({
      where: { id },
      data,
    }).catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.gamesdb.delete({ where: { id } });
    throw new HttpException('',204);
  }

  handleError(error: Error): undefined{
     const errorLines = error.message.split('\n');
     const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
     throw new UnprocessableEntityException(lastErrorLine || "Algum error ocorreu ao executar a operação!");
  }
}
