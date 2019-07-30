import {Injectable} from "@nestjs/common";
import {Ingrediente} from "../Interfaces/Ingrediente";
import {IngredientesEntity} from "./ingredientes.entity";
import {DeleteResult, Repository} from "typeorm";
import {ComidaEntity} from "../Comida/comida.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {getConnection} from "typeorm";
import {isArrayLike} from "rxjs/internal-compatibility";


@Injectable()
export class IngredientesService{
    //bddIngrediente: Ingrediente[] = [];
    recnum = 1;

    constructor(@InjectRepository(IngredientesEntity)
                private readonly _ingredienteRepository: Repository<IngredientesEntity>,){

    }

    listarIngredientes(id):Promise<IngredientesEntity[]>{
        return this._ingredienteRepository.find({
            where:{comidaId:id}
        });
    }

    crear(nuevoIngrediente: IngredientesEntity):Promise<IngredientesEntity> {

        const objetoEntidad = this._ingredienteRepository
            .create(nuevoIngrediente);

        return this._ingredienteRepository.save(objetoEntidad);
    }

    eliminarPorId(id?:number):Promise<object>{
        return this._ingredienteRepository.delete({
            ingredienteId:id
        });
    }

    buscar(parametrosBusqueda?,descripcionBusqueda?):Promise<IngredientesEntity[]>{

        if(parametrosBusqueda!="" && descripcionBusqueda!=""){
            return this._ingredienteRepository.find({
                nombre:parametrosBusqueda,
                descripcion:descripcionBusqueda}
            );
        }else{
            if(parametrosBusqueda=="" && descripcionBusqueda!=""){
                return this._ingredienteRepository.find({
                    nombre:parametrosBusqueda}
                );
            }else if(parametrosBusqueda!="" && descripcionBusqueda==""){
                return this._ingredienteRepository.find({
                    nombre:parametrosBusqueda}
                );
            }else{
                return this._ingredienteRepository.find();
            }
        }

    }

    listarTodo():Promise<IngredientesEntity[]>{
        return this._ingredienteRepository.find();
    }

}
