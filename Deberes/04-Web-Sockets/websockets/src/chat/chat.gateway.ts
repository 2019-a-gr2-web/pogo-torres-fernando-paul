import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Client} from 'socket.io';

@WebSocketGateway(3001, { namespace: '/websockets' })
export class ChatGateway {
@WebSocketServer() server;
@SubscribeMessage('holaMundo')
async smHolaMundo(cliente: Client | any, data: any) {
    cliente.broadcast.emit('saludaron', data);
    return 'Hola ' + data.nombre;
}
constructor() {
        console.log(this.server);
    }
}
