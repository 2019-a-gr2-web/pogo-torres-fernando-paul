import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComidaModule } from './Comida/comida.module'
import { IngredientesModule} from './Ingredientes/ingredientes.module'
import { LoginModule} from './Login/login.module';
import { DespachoModule} from "./Despacho/despacho.module";
import {UserModule} from "./User/user.module";
import { PedidoModule} from "./Pedido/pedido.module";

import { ComidaEntity } from './Comida/comida.entity'
import {DetalleEntity} from "./Detalle/detalle.entity";
import {PedidoEntity} from "./Pedido/pedido.entity";
import {UserEntity} from "./User/user.entity";
import {IngredientesEntity} from "./Ingredientes/ingredientes.entity";

@Module({
  imports: [ComidaModule,
      IngredientesModule,
      LoginModule,
      DespachoModule,
      UserModule,
      PedidoModule,
      TypeOrmModule.forRoot({
          name: 'default', // Nombre cadena conex por defecto de TYPEORM
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Sistemas.2019',
          database: 'examen',
          entities: [
            IngredientesEntity,
              ComidaEntity,
              DetalleEntity,
              PedidoEntity,
              UserEntity
          ],
          synchronize: true,
          insecureAuth : true,
          dropSchema: false,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
