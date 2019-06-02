import {Injectable} from "@nestjs/common";
import {Jugador} from "../Interfaces/Jugador";
import {Equipo} from "../Interfaces/Equipo";

@Injectable()
export class JugadorService {
    bddJugador:Jugador[]=[];
    bddTemp:Jugador[]=[];
    numJugadores=1;

    crear(nuevoJugador:Jugador){
        nuevoJugador.idJugador=this.numJugadores;
        this.numJugadores++;
        this.bddJugador.push(nuevoJugador);
        return nuevoJugador;
    }

    filtrar(id:number):Jugador[]{
        this.bddTemp= this.bddJugador.filter(
            (jugador)=>{
                return jugador.idEquipo===id;
            }
        );
        return this.bddTemp;
    }

    eliminar(id:number,idEquipo:number){
        const indice=this.bddJugador.findIndex(
            (jugador)=>{
                return (jugador.idJugador===id && jugador.idEquipo==idEquipo);
            }
        );
        this.bddJugador.splice(indice,1);
        return this.bddJugador
    }

    buscarPorNombre(id:number,nombre: string):Jugador[] {
        if(nombre!=='' && nombre!==null){
            this.bddTemp= this.bddJugador.filter(
                (jugador)=>{
                    return (jugador.idEquipo===id && jugador.nombreCompletoJugador .toUpperCase().includes(nombre.toUpperCase()));
                }
            );
        }else{
            this.bddTemp= this.bddJugador.filter(
                (jugador)=>{
                    return jugador.idEquipo===id;
                }
            )
        }
        return  this.bddTemp
    }

    constructor(){
        const miJugador:Jugador = {
            idEquipo:1,
            numeroCamiseta:10,
            nombreCamiseta:'Rene',
            nombreCompletoJugador:'Rene Higuita',
            poderEspecialDos: 'Escorpion',
            fechaingresoEquipo:new Date(1980,6,5),
            goles:2
        };
        this.crear(miJugador);
    }
}
