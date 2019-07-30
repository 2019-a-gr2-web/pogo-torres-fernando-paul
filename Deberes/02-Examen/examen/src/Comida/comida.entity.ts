import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { IngredientesEntity } from "../Ingredientes/ingredientes.entity";
import {type} from "os";

@Entity('comida')
export class ComidaEntity {

    @PrimaryGeneratedColumn()
    comidaid:number;

    @Column({
        length:70
    })
    nombre:String;

    @Column({
        length:100
    })
    descripcion:String;

    @Column({
        length:70
    })
    nacionalidad:String;

    @Column({
        type: 'int',
    })
    personas:Number;

    @Column({
        type:'boolean',
        nullable:false
    })
    picante:Boolean;

    @OneToMany(type => IngredientesEntity,
            ingrediente => ingrediente.comidaId)
    ingredientes: IngredientesEntity[]
}
