import {Injectable} from "@nestjs/common";

import {InjectRepository} from "@nestjs/typeorm";
import {PedidoEntity} from "./pedido.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../User/user.entity";
@Injectable()


export class PedidoService {
    constructor(@InjectRepository(PedidoEntity)
                private readonly _pedidoRepository: Repository<PedidoEntity>,){

    }


    crearPedido(id?,nombre?,direccion?,telefono?,cedula?):Promise<PedidoEntity>{
        const objetoEntidad = this._pedidoRepository
            .create({userId:id,
                nombre:nombre,
                direccion:direccion,
                telefono:telefono,
                cedula:cedula
            });

        return this._pedidoRepository.save(objetoEntidad);
    }

    async modificarPedido(id?,subTotal?,total?):Promise<PedidoEntity>{
        const pedido:PedidoEntity= await this._pedidoRepository.findOne({pedidoId:id})
        pedido.totalSinImpuestos=subTotal;
        pedido.totalPedido=total;

        return this._pedidoRepository.save(pedido);
    }

    listarPedidosUser(id):Promise<PedidoEntity[]>{
        return this._pedidoRepository.find({
            where:{userId:id}
        });
    }

    listarPedidosDespacho():Promise<PedidoEntity[]>{
        return this._pedidoRepository.find({
            estado:2
        });
    }

    async editarEstado(id?,estado?):Promise<PedidoEntity> {
        const pedido: PedidoEntity = await this._pedidoRepository.findOne({pedidoId: id})
        pedido.estado = estado;

        return this._pedidoRepository.save(pedido);
    }



}
