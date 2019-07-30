import {Module} from "@nestjs/common";
import {LoginModule} from "../Login/login.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {UserService} from "./user.service";

@Module({
    imports:[LoginModule,

        TypeOrmModule.forFeature(
            [
                UserEntity
            ],
            'default'
        ),
    ],
    controllers:[
    ],
    providers:[UserService
    ],
    exports:[
        UserService
    ]
})

export class UserModule {

}
