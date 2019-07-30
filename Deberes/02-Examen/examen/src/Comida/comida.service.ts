import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Comida } from '../Interfaces/comida';
import { ComidaEntity } from "./comida.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {tryCatch} from "rxjs/internal-compatibility";

@Injectable()
export class ComidaService {
    constructor(
        @InjectRepository(ComidaEntity)
        private readonly _comidaRepository: Repository<ComidaEntity>
    ){}

    finAll():Promise<ComidaEntity[]>{
        return this._comidaRepository.find();

    }
}
