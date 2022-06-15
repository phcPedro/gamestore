import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GameprofileService } from './gameprofile.service';
import { CreateGameprofileDto } from './dto/create-gameprofile.dto';
import { UpdateGameprofileDto } from './dto/update-gameprofile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("gamesprofile")
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('gameprofile')
export class GameprofileController {
  constructor(private readonly gameprofileService: GameprofileService) {}

  @Post('/profile/games')
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


  @Get('homepage/:profileId')

  findOne(@Param('id') id: string) {
    return this.gameprofileService.findOne(id);
  }

  @Patch('profile/games/:profileGameId')
  @ApiOperation({
    summary:"Desfavoritar/favoritar um game."
  })
  update(@Param('id') id: string, @Body() updateGameprofileDto: UpdateGameprofileDto) {
    return this.gameprofileService.update(id, updateGameprofileDto);
  }

  @Delete('profile/games/:profileGameId')
  @ApiOperation({
    summary:"Remove um game pelo ID."
  })
  remove(@Param('id') id: string) {
    return this.gameprofileService.delete(id);
  }
}
