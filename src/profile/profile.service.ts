import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { notFound } from 'src/utils/notfound-error'
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      title: dto.title,
      user: {
        connect: {
          id: userId,
        },
      },
      imageUrl: dto.imageUrl,
    };
    const ProfileList = await this.prisma.profile.findMany({
      where: { userId },
    });
    const theProfile = ProfileList.filter(
      (profile) => profile.title === dto.title,
    );
    if (theProfile.length > 0) {
      throw new BadRequestException(
        'Já existe um perfil com esse nome de usuario, tente outro.',
      );
    }
    return await this.prisma.profile.create({
      data,
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }).catch(handleError);

  }

  async findAll(userId: string) {
    const ProfileList = await this.prisma.profile.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        _count: { select: { games: true } },
      },
    })
    if (ProfileList.length === 0) {
      throw new NotFoundException(
        'Perfil inexistente.',
      );
    }
    return ProfileList;
  }


  async findOne(userId: string, profileId: string) {
    const myProfileList = await this.prisma.profile.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        games: {
          select: {
            id: true,
            game: {
              select: {
                id: true,
                title: true,
                gender: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            favorite: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    const theProfile = myProfileList.filter(
      (profile) => profile.id === profileId,
    );

    notFound(theProfile, profileId);

    return theProfile;
  }


  async update(
    userId: string,
    profileId: string,
    dto: UpdateProfileDto,
  ): Promise<Profile> {
    await this.findOne(userId, profileId);

    const data: Prisma.ProfileUpdateInput = {
      title: dto.title,
      imageUrl: dto.imageUrl,
    };

    const ProfileList = await this.findAll(userId);

    const theProfile = ProfileList.filter(
      (profile) => profile.title === dto.title,
    );

    if (theProfile.length > 0) {
      throw new BadRequestException(
        'Já existe um perfil com este nome nesta conta.',
      );
    }

    return this.prisma.profile
      .update({
        where: { id: profileId },
        data,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          userId: true,
        },
      })
      .catch(handleError);
  }



  async delete(userId: string, profileId: string) {
    await this.findOne(userId, profileId);

    await this.prisma.profile.delete({
      where: { id: profileId },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }
}