import { Injectable } from "@nestjs/common";
import { MakeUserDto } from "./dto/create-user-dto";

@Injectable()

export class UserService{
  create(createUserDto: MakeUserDto) {
    return`New user has been created Successfully!` + JSON.stringify(createUserDto);
  }
  findAll() {
    return"FindAll";
  }

}
