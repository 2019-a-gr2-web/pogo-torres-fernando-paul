import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ComidaEntity} from "../Comida/comida.entity";
import {DetalleEntity} from "../Detalle/detalle.entity";

@Entity('ingrediente')
export class IngredientesEntity {
    @PrimaryGeneratedColumn()
    ingredienteId:number;

    @Column({
        length:50
    })
    nombre:string;

    @Column({
        type: 'int',
    })
    cantidad:number;

    @Column({
        length:100
    })
    descripcion:string;

    @Column({
        type:'boolean',
        nullable:false
    })
    opcional:boolean;

    @Column({
        length:'100'
    })
    tipo:string;

    @Column({
        type:'boolean',
        nullable:false
    })
    refrigeracion:boolean;

    @ManyToOne(type => ComidaEntity,
        comida=> comida.ingredientes)
    comidaId:ComidaEntity;

    @OneToMany(type => DetalleEntity,
        detalle=> detalle.ingredienteId)
    detalles:DetalleEntity[];
}
