import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
const cookieParser = require('cookie-parser');

var session = require('session-file-store')(session);
const FileStore = require('session-file-store')(session);

async function bootstrap() {
    const app = await NestFactory.create(AppModule) as NestExpressApplication;

    app.use(
        session({
            name:'server-session-id',
            secret:'Ya valio barriga señor ....',
            resave:false,
            cookie:{
                secure:false,
                maxAge: 500
            },
            store: new FileStore()
        }));

    app.set('view engine','ejs');
    //@ts-ignore
    app.setBaseViewsDir(join(__dirname,'..','views'));
    app.use(express.static('public'));
    app.use(cookieParser('Top Secret Area 51'));
    await app.listen(3000);
}
bootstrap();
