import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { MakeUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';

import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar todos os usuarios.',
  })
  findAll(@LoggedUser()user:User){
   return this.userService.findAll(user)
  }

  @Get('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Procurar um usuario cadastrado pelo ID.',
  })
  findOne(@LoggedUser() user: User, @Param('id') id: string){
    return this.userService.findOne(id, user);
  }

  @Post()
  @ApiOperation({
    summary: 'Cadastrar um novo usuario.',
  })
  create(@Body() dto: MakeUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar um usuario já cadastrado.',
  })
  update(@LoggedUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  };


  @Delete('/corrent_account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Excluir um usuario.',
  })
  deleteUser(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.deleteUser(id, user);
  }

  @Get('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Visualizar informações da conta Logada.',
  })
  myAccount(@LoggedUser() user: User) {
    return this.userService.myAccount(user.id);
  }
  @Delete('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar conta de usuário que está logada.',
  })
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user.id);
  }

}
