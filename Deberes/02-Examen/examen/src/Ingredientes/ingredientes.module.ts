import {Module} from "@nestjs/common";
import {IngredientesEntity} from "./ingredientes.entity";
import {IngredientesService} from "./ingredientes.service";
import {IngredientesController} from "./ingredientes.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoginModule} from "../Login/login.module";

@Module({
    imports:[LoginModule,
        TypeOrmModule.forFeature(
            [
                IngredientesEntity
            ],
            'default'
        ),
    ],
    controllers:[
        IngredientesController
    ],
    providers:[
        IngredientesService
    ],
    exports:[
        IngredientesService
    ]
})
export  class IngredientesModule {

}
