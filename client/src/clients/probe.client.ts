import { Socket } from 'socket.io-client';
import { WebSocketConsumer } from '../decorators/web.socket.consumer';
import { WebSocketEvent } from '../decorators/web.socket.event';
import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_RAINBOW_APPEARED,
    WEBSOCKET_RAINBOW_DISAPPEARED,
    WEBSOCKET_UNICORN_SIGHTING,
} from '../constants';
import { RainbowAppearedEvent } from '../models/rainbow.appeared.event';
import { RainbowDisappearedEvent } from '../models/rainbow.disappeared.event';
import { Unicorn } from '../models/unicorn';
import { UnicornService } from '../services/unicorn.service';
import { RainbowService } from '../services/rainbow.service';

@WebSocketConsumer()
export class ProbeClient {
    constructor(
        private readonly client: Socket,
        private readonly unicornService: UnicornService,
        private readonly rainbowService: RainbowService,
    ) {}

    @WebSocketEvent(WEBSOCKET_CONNECT)
    connected() {
        console.log('WebSocket client connected to remote Universe!');
    }

    @WebSocketEvent(WEBSOCKET_UNICORN_SIGHTING)
    unicornSightingEvent(unicorn: Unicorn) {
        this.unicornService.addUnicorn(unicorn);
    }

    @WebSocketEvent(WEBSOCKET_RAINBOW_APPEARED)
    rainbowAppearedEvent(rainbow: RainbowAppearedEvent) {
        this.rainbowService.addRainbow(rainbow);
    }

    @WebSocketEvent(WEBSOCKET_RAINBOW_DISAPPEARED)
    rainbowDisappearedEvent(rainbow: RainbowDisappearedEvent) {
        console.log(rainbow);
    }
}
