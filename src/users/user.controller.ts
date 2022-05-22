import { Body, Controller, Get, Post } from "@nestjs/common";
import {MakeUserDto } from "./dto/create-user-dto";
import { UserService } from "./user.service";

@Controller('user')

export class UserController {
  constructor(private userService: UserService){}

  @Get()
  findAll(){
    return this.userService.findAll();

  }

  @Post()
  create(@Body()createUserDto: MakeUserDto){
    return this.userService.create(createUserDto);

  }

}
