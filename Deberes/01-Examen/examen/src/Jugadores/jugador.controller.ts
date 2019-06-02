import {Body, Controller, Get, Param, Post, Req, Res} from "@nestjs/common";
import {JugadorService} from "./jugador.service";
import {LoginService} from "../Login/login.service";
import {Equipo} from "../Interfaces/Equipo";
import {Query} from "@nestjs/common/decorators/http/route-params.decorator";
import {Jugador} from "../Interfaces/Jugador";

@Controller('examen/equipo/gestion')
export  class JugadorController {
    constructor(private readonly _jugadorServices:JugadorService, private readonly _loginService:LoginService){

    }

    @Get(':idEquipo')
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

    @Post('eliminar/:idEquipo')
    eliminar(@Res() res, @Req() req, @Body('idJugador')idJugador:number ){
        this._jugadorServices.eliminar(idJugador,Number(req.params.idEquipo));
        res.redirect('/examen/equipo/gestion/'+Number(req.params.idEquipo));
    }

    @Get('crear/:idEquipo')
    crear(
        @Res() res,
        @Req() req
    ){
        if(this._loginService.validarCookies(req,res)){
            res.render('Jugadores/crear.ejs',{
                usuario:req.signedCookies.usuario,
                idEquipo:req.params.idEquipo
            });
        }
    }

    @Post('crear/:idEquipo')
    crearPost(@Res() res, @Body() jugador:Jugador, @Req() req){
        jugador.idEquipo=Number(req.params.idEquipo);
        jugador.numeroCamiseta=Number(jugador.numeroCamiseta);
        jugador.nombreCamiseta=jugador.nombreCamiseta;
        jugador.nombreCompletoJugador=jugador.nombreCompletoJugador;
        jugador.poderEspecialDos=jugador.poderEspecialDos;
        jugador.fechaingresoEquipo=new Date(jugador.fechaingresoEquipo);
        jugador.goles=Number(jugador.goles);
        this._jugadorServices.crear(jugador);
        res.redirect('/examen/equipo/gestion/'+Number(jugador.idEquipo))
    }

    @Post('buscar/:idEquipo')
    buscar(
        @Res() res,
        @Req() req,
        @Body('busqueda') busqueda:string
    ){
        const listaJugador:Jugador[]=this._jugadorServices.buscarPorNombre(Number(req.params.idEquipo),busqueda);
        if(this._loginService.validarCookies(req,res)){
            res.render('Jugadores/gestionjugadores.ejs',{
                usuario:req.signedCookies.usuario,
                listaJugador:listaJugador,
                idEquipo:req.params.idEquipo
            });
        }
    }
}