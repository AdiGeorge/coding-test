import { Server, Socket } from 'socket.io';
import { Map } from './map';
import { RAINBOW_APPEARED, RAINBOW_DISAPPEARED, UNICORN_SIGHTING } from '../constants';
import { Rainbow } from './rainbow';
import { UnicornSighting } from './unicorn.sighting';

export class Universe {
    private server: Server;

    private readonly clients: Socket[];

    private static universe: Universe = null;

    private map: Map;

    private constructor(map: Map) {
        this.map = map;
        this.clients = [];
    }

    static getUniverse() {
        if (this.universe) {
            return this.universe;
        }

        const map = new Map();
        this.universe = new Universe(map);

        return this.universe;
    }

    public attachWebSocketServer(server: Server) {
        this.server = server;

        console.log('WebSocket Server attached to Universe.');

        return this;
    }

    public registerClient(client: Socket): Universe {
        this.clients.push(client);
        // eslint-disable-next-line
        // @ts-ignore
        console.log(`Client with id ${client.observerId} successfully registered to Universe!`);

        return this;
    }

    public unregisterClient(id: string): Universe {
        // eslint-disable-next-line
        // @ts-ignore
        const clientIndex = this.clients.findIndex((c) => c.observerId === id);
        if (clientIndex > -1) {
            this.clients.splice(clientIndex, 1);
        }

        console.log(`Client with id ${id} successfully removed from Universe!`);

        return this;
    }

    public goLive(): void {
        const actions = [
            () => this.map.spawnUnicorn(),
            () => this.map.generateRainbow(),
            () => this.map.makeRainbowDisappear(),
        ];

        const actionNames = [UNICORN_SIGHTING, RAINBOW_APPEARED, RAINBOW_DISAPPEARED];

        this.map.on(UNICORN_SIGHTING, (unicorn) => {
            return this.onUnicorn(unicorn);
        });
        this.map.on(RAINBOW_APPEARED, (rainbow) => this.onRainbowAppeared(rainbow));
        this.map.on(RAINBOW_DISAPPEARED, (rainbow) => this.onRainbowDisappeared(rainbow));

        setInterval(() => {
            const actionId = Math.floor(Math.random() * 3);
            const action = actions[actionId];

            console.log(`Will perform "${actionNames[actionId]}".`);

            action();
        }, 2000);
    }

    private onUnicorn(unicornSighting: UnicornSighting) {
        for (const client of this.clients) {
            client.emit(UNICORN_SIGHTING, {
                name: unicornSighting.unicorn.name,
                x: unicornSighting.x,
                y: unicornSighting.y,
            });
        }
    }

    private onRainbowAppeared(rainbow: Rainbow) {
        for (const client of this.clients) {
            client.emit(RAINBOW_APPEARED, {
                id: rainbow.id,
                time: rainbow.appearedAt,
            });
        }
    }

    private onRainbowDisappeared(rainbow: Rainbow) {
        for (const client of this.clients) {
            client.emit(RAINBOW_DISAPPEARED, {
                id: rainbow.id,
                time: rainbow.disappearedAt,
            });
        }
    }
}
