import {Injectable} from "@nestjs/common";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IngredientesEntity} from "../Ingredientes/ingredientes.entity";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity)
                private readonly _userRepository: Repository<UserEntity>) {
    }

    buscarUser(nombreUser?,password?,tipoRol?):Promise<UserEntity[]>{
        return this._userRepository.find({
            nombreUser:nombreUser,
            password:password,
            tipo:tipoRol
        });
    }

    buscarUserPorNombre(nombreUser?):Promise<UserEntity> {
        return this._userRepository.findOne({
            nombreUser: nombreUser
        });
    }
}
