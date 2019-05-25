import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import {NestExpressApplication} from "@nestjs/platform-express";
//import {join} from "path";
const cookieParser = require('cookie-parser');
import * as express from 'express';
import * as path from 'path';
import * as favico from 'serve-favicon';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser('Vamos a tomar'));
  app.use(express.static('public'));
  app.use(favico(path.join(__dirname,'..','public','images','icono-cerveza.ico')));
  //@ts-ignore
  app.set('view engine','ejs');
  //app.setBaseViewsDir(join(__dirname,'..','views'));
  await app.listen(3000);
}
bootstrap();
