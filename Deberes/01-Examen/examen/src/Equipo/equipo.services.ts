import {Injectable} from "@nestjs/common";
import {Equipo} from "../Interfaces/Equipo";

@Injectable()
export class EquipoServices {
    bddEquipos:Equipo[]=[];

    numEquipos=1;

    crear(nuevoEquipo:Equipo){
        nuevoEquipo.equipoId=this.numEquipos;
        this.numEquipos++;
        this.bddEquipos.push(nuevoEquipo);
        return nuevoEquipo;
    }

    eliminar(id:number){
        const indice=this.bddEquipos.findIndex(
            (equipo)=>{
                return equipo.equipoId===id;
            }
        );
        this.bddEquipos.splice(indice,1);
        return this.bddEquipos
    }

    buscarPorNombre(nombre: string):Equipo[] {
        if(nombre!=='' && nombre!==null){
            return this.bddEquipos.filter(
                (equipo) => {
                    return equipo.nombre.toUpperCase().includes(nombre.toUpperCase());
                }
            );
        }else{
            return this.bddEquipos
        }

    }

    constructor(){
        const miEquipo:Equipo = {
            nombre:'Aucas',
            liga:'Profesional',
            fechaCreacion:new Date(1935,1,1),
            numeroCopasInternacionales:0,
            campeonActual:false
        };
        this.crear(miEquipo);
    }
}
