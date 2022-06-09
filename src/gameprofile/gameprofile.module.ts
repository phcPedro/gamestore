import { Module } from '@nestjs/common';
import { GameprofileService } from './gameprofile.service';
import { GameprofileController } from './gameprofile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [GameprofileController],
  providers: [GameprofileService]
})

export class GameProfileModule {}
