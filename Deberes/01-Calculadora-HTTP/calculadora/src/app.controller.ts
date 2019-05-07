import { Controller, Get, HttpCode, Headers, Post, Body, Put, Delete, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/Deber/Calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/01-Suma')
  @HttpCode(200)
  getSuma(@Headers() headers): Number {
    const numero1 = Number(headers.numero1);
    const numero2 = Number(headers.numero2);
    const resultado = numero1 + numero2;
    return resultado;
  }

  @Post('/02-Resta')
  @HttpCode(202)
  getResta(@Body() body){
    const numero1 = Number(body.numero1);
    const numero2 = Number(body.numero2);
    const resultado = numero1 - numero2;
    return resultado;
  }
  @Put('03-Multiplicacion')
  @HttpCode(202)
  getMultiplicacion(@Query() query){
    const numero1 = Number(query.numero1);
    const numero2 = Number(query.numero2);
    const resultado = numero1 * numero2;
    return resultado;
  }

  @Delete('04-Division')
  @HttpCode(203)
  getDivision(@Headers() header, @Body() body){
    const numero1 = Number(header.numero1);
    const numero2 = Number(body.numero2);
    const resultado = numero1 / numero2;
    return resultado;
  }
}