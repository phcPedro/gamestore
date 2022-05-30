import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MakeUserDto } from "./dto/create-user-dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { User } from "./entities/user.entity";

@Injectable()

export class UserService{


  constructor(private readonly prisma: PrismaService){}

  create(dto: MakeUserDto): Promise<User> {
    const data: User = {...dto};
    return this.prisma.userdb.create({data});
  }

  findOne(id: string): Promise<User>{
   return this.prisma.userdb.findUnique({
     where: {id,}
   })
  }

  findAll(): Promise<User[]>{
    return this.prisma.userdb.findMany();
  }

  update(id: string, dto: UpdateUserDto): Promise<User> {
    const data: Partial<User> = {...dto};

   return this.prisma.userdb.update({
       where : { id },
       data,
     });
  }
}
