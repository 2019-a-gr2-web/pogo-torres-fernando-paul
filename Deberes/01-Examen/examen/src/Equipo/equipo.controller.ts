import {Controller, Get, Response, Body, Request, Post, Res, Req} from "@nestjs/common";
import {EquipoServices} from "./equipo.services";
import {LoginService} from "../Login/login.service";
import {EquipoModule} from "./equipo.module";
import {Equipo} from "../Interfaces/Equipo";
import {JugadorService} from "../Jugadores/jugador.service";
import {Jugador} from "../Interfaces/Jugador";

@Controller('/examen/equipo')

export class EquipoController {
    constructor(private readonly  _loginService:LoginService, private readonly _equipoServices:EquipoServices, private readonly _jugadorServices:JugadorService){

    }

    @Get('gestion/:idEquipo')
    gestionar(
        @Res() res,
        @Req() req
    ){
        let listaJugador:Jugador []= this._jugadorServices.filtrar(Number(req.params.idEquipo));
        if(this._loginService.validarCookies(req,res)){
            res.render('Jugadores/gestionjugadores.ejs',{
                usuario:req.signedCookies.usuario,
                listaJugador:listaJugador,
                idEquipo:Number(req.params.idEquipo)
            });
        }
    }

    @Post('eliminar')
    eliminar(
        @Res() res,
        @Body('equipoId') equipoId
    ){
        this._equipoServices.eliminar(Number(equipoId));
        res.redirect('/examen/lista')
    }

    @Get('crear')
    crear(
        @Res() res,
        @Req() req
    ){
        if(this._loginService.validarCookies(req,res)){
            res.render('Equipo/crear.ejs',{
                usuario:req.signedCookies.usuario
            });
        }
    }

    @Post('crear')
    crearPost(
        @Res() res,
        @Body() equipo:Equipo,
        @Req() req
    ){
        equipo.nombre=equipo.nombre;
        equipo.liga=equipo.liga;
        equipo.numeroCopasInternacionales=Number(equipo.numeroCopasInternacionales);
        equipo.fechaCreacion= new Date(equipo.fechaCreacion);
        equipo.campeonActual=equipo.campeonActual;
        this._equipoServices.crear(equipo);
        res.redirect('/examen/lista');
    }

    @Post('buscar')
    buscar(
        @Res() res,
        @Req() req,
        @Body('busqueda')busqueda
    ){
        const listaBusqueda:Equipo[]=this._equipoServices.buscarPorNombre(busqueda);
        if(this._loginService.validarCookies(req,res)){
            res.render('Equipo/gestionequipo.ejs',{
                usuario:req.signedCookies.usuario,
                listaEquipo:listaBusqueda
            });
        }
    }
}