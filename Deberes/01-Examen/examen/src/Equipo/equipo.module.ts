import {Module} from "@nestjs/common";
import {EquipoController} from "./equipo.controller";
import {EquipoServices} from "./equipo.services";
import {LoginModule} from "../Login/login.module";
import {LoginService} from "../Login/login.service";
import {JugadorService} from "../Jugadores/jugador.service";

@Module({
    imports:[LoginModule],
    controllers:[
        EquipoController
    ],
    providers:[
        EquipoServices,
        LoginService,
        JugadorService
    ],
    exports:[
        EquipoServices,
        LoginService,
        JugadorService
    ]
})

export class EquipoModule {

}