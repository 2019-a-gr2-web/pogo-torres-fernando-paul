import {Module} from "@nestjs/common";
import { ComidaController } from "./comida.controller";
import { ComidaService } from "./comida.service";
import { ComidaEntity } from "./comida.entity";
import { LoginModule } from "../Login/login.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        LoginModule,
        TypeOrmModule.forFeature(
            [
                ComidaEntity
            ],
            'default'
        ),
    ],  // Modulos
    controllers: [ComidaController], // Controladores
    providers: [ComidaService], // Servicios
    exports: [ComidaService] // Exportar Servicios
})
export class ComidaModule {
}
