import {Controller, Get, Post,Query, Param, Body, Request, Response, HttpCode, Put, Delete, Headers} from '@nestjs/common';
import { AppService } from './app.service';

//http://192.168.1.10:3000/SegmentoInicial/SegmentoAccion
// @Controller (SegmentoInicial)
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // @Get(SegmentoAccion)
  @Get('hello-world')    //Metodo HTTP
  getHello(){
    return 'Run bitch... Run!!!!';
  }

  @Post('hola-mundo')
  postHello() {
    return 'Llego la hora de la purificación';
  }

  @Put('ciao-mondo')
  putHello(){
    return 'Grazie per esistere';
  }

  @Delete('salut-monde')
  deleteHello(){
    return 'Je l\'aime à mourir';
  }

  @Get('/adivina')
  adivina(@Headers() headers): string{
     console.log('Headers: ', headers)
     const numeroRandomico = Math.round(Math.random()*100);
     const numeroDeCabecera = Number(headers.numero);
     if(numeroDeCabecera == numeroRandomico){
        return '';
     }
     else
     {
       return ':('
     }

    //var nombre = 'fernando'; //string
    // var edad= 23; //number
    //var sueldo= 1.20; //number
    //var casado= false; //boolean
    //var hijos = null; //null
    //var alas = undefined; //undefined

    // js -> ts
    //let nombre: string = 'Fernando'; //String
    //let edad:number = 23; //number
    //let sueldo:number = 1.20; //number
    //let casado:boolean = false; //boolean
    //let hijos = null; //null
    //let alas = undefined; //undefined
  }

  //?llave1=valor1&llave2=valor2nmp
  @Get('/consultar')
    consultar(@Query() queryParams){
      console.log(queryParams);
      if(queryParams.nombre) {
          return `Hola ${queryParams.nombre}`
      }
      else{
          return 'No saludo a extraños '
      }
  }

  @Get('/ciudad/:idCiudad/:idBarrio')
    ciudad(@Param() parametrosRuta){
        switch (parametrosRuta.idCiudad.toLowerCase()){
            case 'quito':
                return 'Que mas ve'
            case 'guayaquil':
                return 'Que mas ñaños'
            default:
                return 'Estas equivocado'
        }
  }

  @Post('/registroComida')
    registroComida(@Body() parametrosCuerpo,
                   @Response() response){
      if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){
          const cantidad = Number(parametrosCuerpo.cantidad);
          if(cantidad>1){
              response.set('Premio','Encebollado');
          }

              return response.send('Registro creado');


      }
      else
      {
          return response.status(400)
              .send({
                 mensaje:'Error, no envia nombre o cantidad',
                error: 400
      });
      }
      console.log(parametrosCuerpo);
      return 'ok'
  }

  @Get('/semilla')
    semilla(@Request() request){
      console.log(request.cookies);
      const cookies = request.cookies;
      if(cookies.miCookie){
          return 'Todo esta muy bien'
      }
      else
      {
          return 'Ya valiste';
      }

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

const json =
    [{
        "llave": "valor",
        "key": "value",
        "nombre": "Fernando",
        "apellido": "Pogo",
        "edad": 29,
        "sueldo": 129.5,
        "casado": false,
        "hijos": null,
        "enamorada": ["Carolina","Chuqui"]
      }];

let objeto:any = {
  propiedad: 'valor',
  propiedadDos: 'valor2'
};

objeto.propiedad // valor
objeto.propiedadDos //valor2

//Agregar propiedades a un objeto
objeto.propiedadTres = 'valor3';
objeto['propiedadCuatro'] = 'valor4';

//Eliminar propiedades
delete objeto.propiedadTres; // Destruir
objeto.propiedadCuatro; // Destruir