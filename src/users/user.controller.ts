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
import { UserService } from './user.service';
import { MakeUserDto } from './dto/create-user-dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { UpdateAdminDto } from './dto/updateadmin-dto';



@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('user-admin')
  @Get('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar todos os usuários.',
  })
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }
  @ApiTags('user-admin')
  @Delete('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar conta de usuário por Id .',
  })
  remove(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.remove(user, id);
  }

  @ApiTags('user-admin')
  @Get('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID.',
  })
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.findOne(user, id);
  }
  @ApiTags('user-admin')
  @Patch('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Privilegios de Admin para o ID.',
  })
  takeAuth(
    @LoggedUser() user: User,
    @Body() dto: UpdateAdminDto,
    @Param('id') id: string,
  ) {
    return this.userService.takeAuth(user, dto, id);
  }

  @Post()
  @ApiOperation({
    summary: 'Cadastrar um novo usuario.',
  })
  create(@Body() dto: MakeUserDto){
    return this.userService.create(dto);
  }
  @ApiTags('user-my-account')
  @Get('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Visualizar informações da conta Logada.',
  })
  myAccount(@LoggedUser() user: User) {
    return this.userService.myAccount(user.id);
  }
  @ApiTags('user-my-account')
  @Patch('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar dados da conta do usuario',
  })
  update(@LoggedUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @ApiTags('user-my-account')
  @Delete('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'excluir a conta do usuario.',
  })
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user.id);
  }
}
