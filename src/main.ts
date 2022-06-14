import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors: true});

  app.set('trusty proxy',1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('GameStore')
  .setDescription('Plataforma onde você gerencia seus jogos preferidos')
  .setVersion('1.0.0')
  .addTag('status')
  .addTag('auth')
  .addTag('user')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

await app.listen(process.env.PORT || 3333);
}
bootstrap();
