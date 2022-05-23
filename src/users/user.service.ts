import { Injectable } from "@nestjs/common";
import { MakeUserDto } from "./dto/create-user-dto";
import { User } from "./entities/user.entity";

@Injectable()

export class UserService{
  users: User[] = [];

  create(createUserDto: MakeUserDto) {
    const user : User = {id: this.users.length+1, ...createUserDto };

    this.users.push(user);
    return user;
  }
  findAll() {
    return this.users;
  }

}
