import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {MakeUserDto } from "./dto/create-user-dto";
import { User } from "./entities/user.entity";

import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService){}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuarios.'
  })
  findAll(): Promise<User[]>{
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Procurar um usuario cadastrado pelo ID.'
  })
  findOne(@Param('id')id: string): Promise<User>{
    return this.userService.findOne(id);

  }

  @Post()
  @ApiOperation({
    summary: 'Cadastrar um novo usuario.'
  })
  create(@Body()dto: MakeUserDto): Promise<User>{
    return this.userService.create(dto);

  }

}
