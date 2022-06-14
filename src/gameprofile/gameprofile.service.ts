import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { notFound } from 'src/utils/notfound-error';
import { CreateGameprofileDto } from './dto/create-gameprofile.dto';
import { UpdateGameprofileDto } from './dto/update-gameprofile.dto';

@Injectable()
export class GameprofileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameprofileDto) {
    const data: Prisma.GameProfileCreateInput = {
      game: { connect: { id: dto.gameId } },
      profile: { connect: { id: dto.profileId } },
      favorite: dto.favorite,
    };

    return await this.prisma.gameProfile
      .create({
        data,
        select: {
          game: {
            select: {
              id: true,
              title: true,
            },
          },
          profile: {
            select: {
              id: true,
              title: true,
            },
          },
          favorite: true,
        },
      })
      .catch(handleError);
  }

  findAll() {
    return `This action returns all gameprofile`;
  }

  async findOne(userId: string, profileId: string){
    const record = await this.prisma.gameProfile.findMany({
      where: {profileId},
      select:{
        id:true,
        game:{
          select:{
            title: true,
            year:true,
            gender:{
              select: {
                name:true,
              },
            },
          },
        },
        favorite: true,
      }
    })
    notFound(record, profileId);

    return record;
  }

 async update(id, dto: UpdateGameprofileDto){
   const record = await this.prisma.gameProfile.findUnique({
     where: {id},
   });
   notFound(record, id);

  const data: Prisma.GameProfileUpdateInput={
    favorite: dto.favorite,
  };
  return this.prisma.gameProfile
    .update({
    where: {id},
    data,
  })
  .catch(handleError);
 }
  async delete(id){
    const record = await this.prisma.gameProfile.findUnique({
      where:{id},

    });
    notFound(record, id);
    throw new HttpException("Excluido com exito",204);
  }
}
