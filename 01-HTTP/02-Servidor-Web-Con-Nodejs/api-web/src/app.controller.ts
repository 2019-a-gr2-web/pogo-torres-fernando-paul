import {Controller, Get, Post,Query, Param, Body, Request, Response, HttpCode, Put, Delete, Headers} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';

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
    semilla(@Request() request,
            @Response() response){
      console.log(request.cookies);
      const cookies = request.cookies;  // Json
      const esquemaValidacionNumero = Joi.object().keys({
          numero: Joi.number().integer().required()
      });

      const objetoValidacion=Joi.validate({
          numero: cookies.numero
      });

      const resultado = Joi.validate(objetoValidacion, esquemaValidacionNumero);
      if(resultado.error)
      {
          console.log('Resultado: ', resultado);
      }
      else
      {
          console.log('Numero valido');
      }

      const cookieSegura = request.signedCookies.fechaServidor;
      if(cookieSegura)
      {
          console.log('Cookie segura');
      }
      else
      {
          console.log('No es valida esta cookie');
      }
      if(cookies.miCookie){
          const horaFechaServidor = new Date();
          const minutos = horaFechaServidor.getMinutes();
          horaFechaServidor.setMinutes(minutos + 1);

          response.cookie(
              'fechaServidor',
              new Date().getTime(),
          {
              signed: true
          }
          );
          return response.send('Todo Bien')
      }
      else
      {
          return response.send('No sirve')
      }

  }

  @Get('inicio')
    inicio(
        @Response() res
  ){
      return res.render(
          'inicio',
          {
            estaVivo: true
          });
  }

    @Get('movies')
    movies(
        @Response() res
    ){
        return res.render(
            'movies/start',
            {

            });
    }


    @Get('styles')
    styles(
        @Response() res
    ){
        return res.render(
            'movies/styles',
            {

            });
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


// Variables ? const, var, let
// string, numbre, boolean

function holaMundo(){
    console.log('Ya llevame dios');
}

const respuestaHolaMundo = holaMundo(); //undefined
console.log('Resp hola mundo: ', respuestaHolaMundo);

function suma(a: number,b: number):number{
    return a+b;
}
const respuestaSuma = suma(1,2); //3
console.log('Resp suma: ', respuestaSuma);


// Condicionales
// Truty > true
// Falsy > false
if(true){  //Truty
    console.log('Verdadero');
}else{
    console.log('Falso');
}

if(false){ //Falsy
    console.log('Falso');
}else{
    console.log('Verdadero');
}

if(""){ //Falsy
    console.log('Falso');
}else{
    console.log('Verdadero');
}
if("a"){
    console.log('Falso');
}else{
    console.log('Verdadero');
}
if(0){ //Falsy
    console.log('Falso');
}else{
    console.log('Verdadero');
}
if('0'){ //Truty
    console.log('Falso');
}else{
    console.log('Verdadero');
}


// Operadores de Arreglos en JS

const arreglo =[1,2,3,4,5,6]

// 1) Imprimir en consola todos los elementos
const rForEach = arreglo.forEach( function (valorActual, indice, arreglo)
{
    console.log(`Valor: ${valorActual}`);
    console.log(`Indice: ${indice}`);
    console.log(`Arreglo: ${arreglo}`);
});
console.log(`RESPUESTA FOREACH: ${rForEach}`);

const r2ForEach = arreglo.forEach(n=> console.log(`${n}`))
console.log(`RESPUESTA FOREACH: ${r2ForEach}`);

// 2) sumen 2 a los pares y 1 a los impares

const  arregloNumerosMap = [1,2,3,4,5,6]
const rMap = arregloNumerosMap
    .map( //Devolver el nuevo VALOR de ese elemento
        (valorActual)=>{
            const esPar = valorActual%2==0;
            if(esPar){
                const nuevoValor = valorActual +2;
                return nuevoValor;
            }else{
                const nuevoValor = valorActual +1;
                return nuevoValor;
                return valorActual  +1;
            }
});

console.log(`RESPUESTA MAP: ${rMap}`); // Nuevo Arreglo

// 3) encuentren si hay el numero 4
const arregloNumerosFind = [1,2,3,4,5,6];

const rFind = arregloNumerosFind
    .find(//CONDICION para devolver esse elemento
        (valorActual)=>{
            return valorActual==4;
        });
console.log(`Respuesta FIND: ${rFind}`);

// 4) Filtren los numeros menores a 5
const arregloNumerosFilter = [1,2,3,4,5,6];

const rFiltaer = arregloNumerosFilter
    .filter(//CONDICION TRUE => Agrregar al arreglo
            //CONDICION FALSA => Se omite del arreglo
            (valorActual)=>{
                return valorActual <5;
            });
// 5) Todos los valores son positivos??
const arregloNumerosEvery = [1,2,3,4,5,6];

const rEvery = arregloNumerosEvery   //And
    .every( //Si todos cumplen TRUE
            // Si alguno no cumple FALSE
        (valorActual)=>{
            return valorActual>0
        }
    );
console.log(rEvery); //TRUE

// 6) Algun valor es menor que 2??
const arregloNumerosSome = [1,2,3,4,5,6];

const rSome=arregloNumerosSome
    .some(  // Si alguno cumple la condición True!!
            // Si todos no cumplen False!!
        (valorActual)=> {
            return valorActual<2;
        });
console.log(rSome);

// 7) Sumen todos los valores
const arregloNumeroReduce=[1,2,3,4,5,6];
const valorDondeEmpiezacalculo=0;
const auxiliar=0;
// <4
// 10% + 5
// >= 4
// 15% + 3
const rReduce=arregloNumeroReduce
    .reduce(
        (acumulado,valorActual)=> {
        if(valorActual<4){
            return acumulado + valorActual*1.1 + 5;
        }else {
            return acumulado + valorActual*1.15 +3;
        }
    },
    auxiliar
);
console.log(rReduce); // 21

// 8) Resten todos los valores de 100
const arregloNumeroReduce1=[1,2,3,4,5,6];
const auxiliar1 = 100;
const rReduce1=arregloNumeroReduce1
    .reduce(
        (acumulado,valorActual)=>{
           return valorActual;
    },
    auxiliar1
);
console.log(rReduce1);

// 1.1) Sumen 10 a todos
// 1.2) Filtren a los mayores a 15
// 1.3) Si hay algun numero mayor a 30
const arregloNumero = [1,2,3,4,5,6];

const r=arregloNumero
    .map(
        (valorActual)=>{
            return valorActual + 10;
        }
    )
    .filter(
        (valorActual)=>{
            return valorActual > 15;
        }
    )
    .some(
        (valorActual)=>{
            return valorActual > 30;
        }
    );

console.log(r);
