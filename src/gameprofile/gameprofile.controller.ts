import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GameprofileService } from './gameprofile.service';
import { CreateGameprofileDto } from './dto/create-gameprofile.dto';
import { UpdateGameprofileDto } from './dto/update-gameprofile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Userdb } from '@prisma/client';

@ApiTags("gamesprofile")
@Controller('gameprofile')
export class GameprofileController {
  constructor(private readonly gameprofileService: GameprofileService) {}

  @UseGuards(AuthGuard())
  @Post()
  @ApiOperation({
    summary:"Adicina o game ao perfil."
  })
  create(@Body() dto: CreateGameprofileDto) {
    return this.gameprofileService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary:"Lista de todos os jogos favoritados pelo perfil."
  })
  findAll() {
    return this.gameprofileService.findAll();
  }

  @Get(':id')

  findOne(@LoggedUser() user: Userdb, @Param('profileId') profileId: string) {
    return this.gameprofileService.findOne(user.id, profileId);
  }

  @Patch(':id')
  @ApiOperation({
    summary:"Desfavoritar/favoritar um game."
  })
  update(@Param('id') id: string, @Body() updateGameprofileDto: UpdateGameprofileDto) {
    return this.gameprofileService.update(id, updateGameprofileDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:"Remove um game pelo ID."
  })
  remove(@Param('id') id: string) {
    return this.gameprofileService.delete(id);
  }
}
