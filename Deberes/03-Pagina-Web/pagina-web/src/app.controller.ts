import { Controller, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/Deberes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  inicio(@Response() res){
    return res.render('inicio');
  }

  @Get('back')
  back(@Response() res){
    return res.render('back');
  }
}
