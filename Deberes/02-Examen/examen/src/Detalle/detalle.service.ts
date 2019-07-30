import {Injectable} from "@nestjs/common";
import {DetalleEntity} from "./detalle.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class DetalleService {
    constructor(@InjectRepository(DetalleEntity)
                private readonly _detalleRepository:Repository<DetalleEntity>
    ){

    }

    listarDetalle(id):Promise<DetalleEntity[]>{
        return this._detalleRepository.find({
            where:{pedidoId:id}
        });
    }

    crearDetalle(pedidoId?,ingredienteId?):Promise<DetalleEntity>{
        const objetoEntidad = this._detalleRepository
            .create({pedidoId:pedidoId,ingredienteId:ingredienteId
            });

        return this._detalleRepository.save(objetoEntidad);

    }
}
