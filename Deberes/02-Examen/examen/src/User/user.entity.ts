import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleEntity} from "../Detalle/detalle.entity";
import {PedidoEntity} from "../Pedido/pedido.entity";

@Entity('usuario') // Nombre tabla
export class UserEntity {

    @PrimaryGeneratedColumn()
    userId?:number;

    @Column({
        length:100
    })
    nombreUser?: string;

    @Column({
        length:10
    })
    password?: string;

    @Column({
        length:100
    })
    direccion?: string;

    @Column({
        length:10
    })
    telefono: string;

    @Column({
        length:10
    })
    cedula: string;

    @Column({
        type: 'int',
    })
    tipo?: '1'|'2'|'3';

    @OneToMany(type => PedidoEntity,
        pedido=> pedido.userId)
    pedidos:DetalleEntity[];
}
