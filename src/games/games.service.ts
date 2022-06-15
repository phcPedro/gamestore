import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { notFound } from 'src/utils/notfound-error';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import {isAdmin} from '../utils/admin';
import { User } from 'src/users/entities/user.entity';

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

  async create(user : User, dto:CreateGameDto){
    isAdmin(user)

    const data : Prisma.GamesdbCreateInput = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdScore: dto.imdScore,
      trailerYoutubeUrl: dto.trailerYoutubeUrl,
      gamePlayYoutubeUrl: dto.gamePlayYoutubeUrl,
      gender:{
        connectOrCreate:{
          create: {name: dto.gender},
          where: {name: dto.gender},
        },
      },
    }
   return await this.prisma.gamesdb.create({data}).catch(handleError);
  };

  async findOne(id: string): Promise<Game> {
    const record = await this.prisma.gamesdb.findUnique({ where: { id } });

    notFound(record, id);
    return record;

  }

  async findAll(): Promise<Game[]> {
    const list = await this.prisma.gamesdb.findMany();

    if (list.length === 0) {
      throw new NotFoundException(
        'Não existem jogos cadastrados.',
      );
    }


    return list;
  }

  async update(id: string, user:User, dto: UpdateGameDto): Promise<Game> {
    isAdmin(user)
    await this.findOne(id);

    const data = { ...dto };

    return this.prisma.gamesdb
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string, user: User) {
  isAdmin(user)
  await this.findOne(id);

  await this.prisma.gamesdb.delete({
    where: {id},
  })
  throw new HttpException('Jogo deletado com exito!',204);
  }

  handleError(error: Error): undefined{
     const errorLines = error.message.split('\n');
     const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
     throw new UnprocessableEntityException(lastErrorLine || "Algum error ocorreu ao executar a operação!");
  }
}
