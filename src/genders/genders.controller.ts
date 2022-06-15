import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Genders } from './entities/genders.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Userdb } from '@prisma/client';

@ApiTags('Gender')
@Controller('gender')
export class GendersController {
  constructor(private readonly genderService: GendersService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Only Amin - Criar novo Gênero.',
  })
  create(
    @LoggedUser() user:Userdb,
    @Body() dto: CreateGenderDto): Promise<Genders> {
    return this.genderService.create(dto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Gêneros.',
  })
  findAll(): Promise<Genders[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um gênero através do ID.',
  })
  findOne(@Param('id') id: string): Promise<Genders> {
    return this.genderService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Ony Admin - Editar um gênero através do ID.',
  })
  update(
    @LoggedUser() user: Userdb,
    @Param('id') id: string,
    @Body() dto: UpdateGenderDto,
  ): Promise<Genders> {
    return this.genderService.update(id, dto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Only Admin - Deletar um gênero através do ID.',
  })
  delete(@LoggedUser() user: Userdb, @Param('id') id: string) {
    return this.genderService.delete(id, user);
  }
}
