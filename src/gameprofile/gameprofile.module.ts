import { Module } from '@nestjs/common';
import { GameprofileService } from './gameprofile.service';
import { GameprofileController } from './gameprofile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GameprofileController],
  providers: [GameprofileService]
})

export class GameProfileModule {}
