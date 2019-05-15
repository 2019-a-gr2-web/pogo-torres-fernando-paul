import { Controller, Get, Query, Request, Response, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/Deberes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/CalculadoraCookieSuma')
  calculadoraCookieSuma(@Query() queryParams,
                        @Request() request,
                        @Response() response) {
    if(queryParams.nombre && queryParams.numeroUno && queryParams.numeroDos) {
      const cookie = request.cookies;
      const cookieSegura = request.signedCookies;

      if(!cookie.nombreUsuario){
        response.cookie('nombreUsuario',queryParams.nombre);
      }
      if(!cookieSegura.puntuacion){
        const puntos =  100;
        console.log('Su puntuación es:'+puntos);
        response.cookie('puntuacion',puntos,{signed:true})
        const respuesta= Number(queryParams.numeroUno)+Number(queryParams.numeroDos);
        const jsonRespuesta={
          'nombreUsuario':queryParams.nombre,
          'resultado':respuesta
        }
        return response.send(jsonRespuesta);
      }
      else
      {
        const respuesta= Number(queryParams.numeroUno)+Number(queryParams.numeroDos);
        const puntos = Number(cookieSegura.puntuacion) - Number(respuesta);
        console.log('Su puntuación es:'+puntos);
        response.cookie('puntuacion',puntos,{signed:true})

        if(puntos<=0){
          const jsonRespuesta={
            'nombreUsuario':queryParams.nombre,
            'resultado':respuesta,
            'Mensaje':'Se terminaron los puntos'
          }

          return response.send(jsonRespuesta);
        }
        else{
          const jsonRespuesta={
            'nombreUsuario':queryParams.nombre,
            'resultado':respuesta
          }
          return response.send(jsonRespuesta);
        }
      }
    }
    else {
      return response.status(400).send({mensaje:'Error, parámetros incorrectos',error:400})
    }

  }
}
