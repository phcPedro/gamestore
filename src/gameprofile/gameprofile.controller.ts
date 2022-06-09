import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameprofileService } from './gameprofile.service';
import { CreateGameprofileDto } from './dto/create-gameprofile.dto';
import { UpdateGameprofileDto } from './dto/update-gameprofile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("gamesprofile")
@Controller('gameprofile')
export class GameprofileController {
  constructor(private readonly gameprofileService: GameprofileService) {}

  @Post()
  @ApiOperation({
    summary:"Adicina o game ao perfil."
  })
  create(@Body() createGameprofileDto: CreateGameprofileDto) {
    return this.gameprofileService.create(createGameprofileDto);
  }

  @Get()
  @ApiOperation({
    summary:"Lista de todos os jogos favoritados pelo perfil."
  })
  findAll() {
    return this.gameprofileService.findAll();
  }

  @Get(':id')

  findOne(@Param('id') id: string) {
    return this.gameprofileService.findOne(id);
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
