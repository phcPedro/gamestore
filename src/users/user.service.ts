import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MakeUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User> {
    const record = await this.prisma.userdb.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`O ID: ${id} não foi encontrado!`);
    }

    return record;
  }

  async create(dto: MakeUserDto): Promise<User> {
    if(dto.password != dto.confirmPassword){
      throw new BadRequestException('As senhas não coincidem! As senhas precisam ser iguais.');
    }

    delete dto.confirmPassword;

    const data: User = { ...dto, password: await bcrypt.hash(dto.password, 10) };

    return this.prisma.userdb.create({ data }).catch(this.handleError);
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  findAll(): Promise<User[]> {
    return this.prisma.userdb.findMany();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);

    if(dto.password){
      if (dto.password != dto.confirmPassword){
        throw new BadRequestException('As senhas não coincidem! As senhas precisam ser iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if(data.password){
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.userdb
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.userdb.delete({ where: { id } });
    throw new HttpException('', 204);
  }

  handleError(error: Error): undefined {
    const errorLines = error.message.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();


     if (!lastErrorLine){
       console.error(error);
     }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum error ocorreu ao executar a operação!',
    );
  }
}
