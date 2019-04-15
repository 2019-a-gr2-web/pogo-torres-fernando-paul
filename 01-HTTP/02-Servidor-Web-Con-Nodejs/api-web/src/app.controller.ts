import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello() {
    return 'Hola mi nuevo mundo en post';
  }
}
/*
@nombreDecorador() //Se usan antes de instanciar atributos, metodos o parametros en decoradores
class usuario{
  @atributo)=
  atributo_publico;
  private atributo_privado;
  protected atributo_protegido;

  constructor(@ Parametro() atributo_publico, atributo_privado, atributo_protegido){
    this.atributo_publico = atributo_publico;
    this.atributo_privado = atributo_privado;
    this.atributo_protegido = atributo_protegido;
  }

  @MetodoA()
  public metodoPublico(@ParametroA() a){}
  @MetodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}
}
*/

