import {Controller, Get, Req, Res} from "@nestjs/common";
import { ComidaService } from "./comida.service";
import { LoginService } from "../Login/login.service";

@Controller('api/padre')
export class ComidaController {
    constructor(private readonly  _comidaService: ComidaService,
                private readonly _loginService: LoginService){

    }
}
