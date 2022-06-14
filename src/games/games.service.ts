import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/isAdmin';
import { notFound } from 'src/utils/notfound-error';
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

  async create(user: User, dto: CreateGameDto){
    const data : Prisma.GamesdbCreateInput = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdScore: dto.imdScore,
      trailerYoutubeUrl: dto.trailerYoutubeUrl,
      gamePlayYoutubeUrl: dto.gamePlayYoutubeUrl,
      gender:{
        connect:{
         name: this.dataTreatment(dto.gender),
        },
      },
    }
   return await this.prisma.gamesdb.create({data}).catch(handleError);
  };

  async findOne(id: string): Promise<Game> {
    const record = await this.prisma.gamesdb.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        gender: {
          select: {
            name: true,
          },
        },
        imdScore: true,
        description: true,
        year: true,
        trailerYoutubeUrl: true,
        gamePlayYoutubeUrl: true,
        _count: {
          select: {
            profiles: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    notFound(record, id);

    return record;
  }

  async findAll(): Promise<Game[]> {
    const gameList = await this.prisma.gamesdb.findMany({
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        gender: {
          select: {
            name: true,
          },
        },
        imdScore: true,
        description: true,
        year: true,
        trailerYoutubeUrl: true,
        gamePlayYoutubeUrl: true,
        _count: {
          select: {
            profiles: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (gameList.length === 0) {
      throw new NotFoundException('Não existem jogos cadastrados.');
    }
    return gameList;
  }
  async update(user: User, id: string, dto: UpdateGameDto): Promise<Game> {
    isAdmin(user);

    await this.findOne(id);

    const data = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdScore,
      trailerYouTubeUrl: dto.trailerYoutubeUrl,
      gameplayYouTubeUrl: dto.gamePlayYoutubeUrl,
      genres: {
        connect: {
          name: this.dataTreatment(dto.gender),
        },
      },
    };

    return this.prisma.gamesdb
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(user: User, id: string) {
    isAdmin(user);

    await this.findOne(id);

    await this.prisma.gamesdb.delete({
      where: {id},

    });
    throw new HttpException('Deletado com sucesso.', 204);
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}
