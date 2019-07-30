import {Module} from "@nestjs/common";
import {LoginModule} from "../Login/login.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PedidoEntity} from "./pedido.entity";
import {PedidoController} from "./pedido.controller";
import {PedidoService} from "./pedido.service";
import {UserEntity} from "../User/user.entity";
import { UserModule } from "../User/user.module";
import {DetalleModule} from "../Detalle/detalle.module";
import {PedidoGateway} from "./pedido.gateway";

@Module({
    imports:[LoginModule,UserModule,DetalleModule,

        TypeOrmModule.forFeature(
            [
                PedidoEntity
            ],
            'default'
        ),
    ],
    controllers:[
        PedidoController
    ],
    providers:[
        PedidoService,PedidoGateway
    ],
    exports:[
        PedidoService,
    ]
})

export class PedidoModule {

}
