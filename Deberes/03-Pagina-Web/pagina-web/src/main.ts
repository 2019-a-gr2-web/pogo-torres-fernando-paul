import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express'


async function bootstrap() {
  const app = await NestFactory
      .create(AppModule) as NestExpressApplication;

  app.setViewEngine('ejs');
  app.use(express.static('images'))
  app.setBaseViewsDir(join(__dirname,'..','views'));
  await app.listen(3000);
}
bootstrap();
