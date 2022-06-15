import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from '../users/entities/user.entity';
import { Game } from './entities/game.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}


  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cria um novo game.',
  })
  create(@LoggedUser() user: User, @Body() dto:CreateGameDto):Promise<Game> {
    return this.gamesService.create(user, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os games já cadastrados.',
  })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Pega um unico game de acordo com seu ID.',
  })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualize ou modifica informações de um game pelo ID.',
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateGameDto: UpdateGameDto):Promise <Game> {
    return this.gamesService.update(id,  user, updateGameDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deleta um game pelo ID.',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
   return this.gamesService.delete(id, user);
  }
}
