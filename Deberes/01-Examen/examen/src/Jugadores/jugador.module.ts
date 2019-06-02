import {Module} from "@nestjs/common";
import {JugadorController} from "./jugador.controller";
import {JugadorService} from "./jugador.service";
import {LoginModule} from "../Login/login.module";

@Module({
    imports:[LoginModule],
    controllers:[
        JugadorController
    ],
    providers:[
        JugadorService
    ],
    exports:[
        JugadorService
    ]
})

export class JugadorModule {

}