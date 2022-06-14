import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Userdb } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateGenderDto} from './dto/create-gender.dto';
import { Genders } from './entities/genders.entity';
import { GendersService } from './genders.service';

@ApiTags('game-genre')
@Controller('genre')
export class GendersController {
  constructor(private readonly genreService: GendersService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar novo Gênero.',
  })
  create(
    @LoggedUser() user: Userdb,
    @Body() dto: CreateGenderDto,
  ): Promise<Genders> {
    return this.genreService.create(user, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Gêneros.',
  })
  findAll(): Promise<Genders[]> {
    return this.genreService.findAll();
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Visualizar um gênero pelo nome.',
  })
  findOne(@Param('name') name: string): Promise<Genders> {
    return this.genreService.findOne(name);
  }

  @Delete(':name')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar gênero pelo nome.',
  })
  delete(@LoggedUser() user: Userdb, @Param('name') name: string) {
    return this.genreService.delete(user, name);
  }
}