import {Controller, Get, Res, Req, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import {LoginService} from "./Login/login.service";
import {ResponseError} from "superagent";
import {EquipoServices} from "./Equipo/equipo.services";

@Controller('/examen')
export class AppController {
  constructor(private readonly _loginService:LoginService,private readonly _equipoServices:EquipoServices) {}

  @Get()
  inicio(@Res() res,@Req() req) {
    res.redirect('/examen/login')
  }

  @Get('menu')
  menu(@Res() res,@Req() req){
    if(this._loginService.validarCookies(req,res)){
      res.render('menu.ejs',{
        usuario:req.signedCookies.usuario
      });
    }
  }

  @Get('login')
  login(@Res() res, @Req() req){
    if(req.usuario){
      req.usuario('usuario', null)
    }
    res.render('Login/login.ejs');
  }

  @Post('ingresar')
  ingresar(@Body('usuario')usuario:string, @Res() res){
    res.cookie('usuario', usuario, {signed: true}).redirect('/examen/menu');
  }

  @Get('lista')
  gestion(@Res() res,@Req() req){
    const listaEquipo = this._equipoServices.bddEquipos;
    if(this._loginService.validarCookies(req,res)){
      res.render('Equipo/gestionequipo.ejs',{
        usuario:req.signedCookies.usuario,
        listaEquipo:listaEquipo
      });
    }
  }
}