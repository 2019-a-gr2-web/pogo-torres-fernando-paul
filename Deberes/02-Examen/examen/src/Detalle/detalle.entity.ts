import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IngredientesEntity} from "../Ingredientes/ingredientes.entity";
import {ComidaEntity} from "../Comida/comida.entity";
import {PedidoEntity} from "../Pedido/pedido.entity";

@Entity('detalle')
export  class DetalleEntity {

    @PrimaryGeneratedColumn()
    detalleId:number;

    @ManyToOne(type => IngredientesEntity,
        ingrediente=> ingrediente.detalles)
    ingredienteId:IngredientesEntity;

    @ManyToOne(type => PedidoEntity,
        pedido=> pedido.detalles)
    pedidoId:PedidoEntity;

}
