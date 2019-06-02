import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EquipoModule} from "./Equipo/equipo.module";
import {JugadorModule} from "./Jugadores/jugador.module";
import {LoginModule} from "./Login/login.module";

@Module({
  imports: [EquipoModule,JugadorModule,LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
