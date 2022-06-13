import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { GendersModule } from './genders/genders.module';
import { GameProfileModule } from './gameprofile/gameprofile.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, GamesModule, GendersModule, GameProfileModule, ProfileModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
