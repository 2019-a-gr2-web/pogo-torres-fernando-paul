import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser('Vamos a tomar'));
  app.use(express.static('public'));
  //@ts-ignore
  app.set('view engine','ejs');
  //app.setBaseViewsDir(join(__dirname,'..','views'));
  await app.listen(3000);
}
bootstrap();
