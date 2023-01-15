import { Rainbow } from './rainbow';
import { Unicorn } from './unicorn';
import { RAINBOW_APPEARED, RAINBOW_DISAPPEARED, UNICORN_SIGHTING } from '../constants';
import * as events from 'events';
import { UnicornSighting } from './unicorn.sighting';

export class Map extends events.EventEmitter {
    private rainbows: Rainbow[] = [];

    constructor() {
        super();
    }

    public generateRainbow(): Map {
        const rainbow = new Rainbow();
        this.rainbows.push(rainbow);

        console.log(`Oh, look! A new rainbow with id ${rainbow.id} appeared at ${rainbow.appearedAt}!`);
        this.emit(RAINBOW_APPEARED, rainbow);

        return this;
    }

    public makeRainbowDisappear(): Map {
        const rainbow = this.pickARandomRainbow();
        if (rainbow) {
            rainbow.makeDisappear();

            console.log(`Rainbow with id ${rainbow.id} disappeared at ${rainbow.disappearedAt}.`);
            this.emit(RAINBOW_DISAPPEARED, rainbow);
        }

        return this;
    }

    public spawnUnicorn(): Map {
        const unicorn = new Unicorn();
        const unicornSighting = new UnicornSighting(unicorn);

        console.log(
            `A new unicorn was spotted at (${unicornSighting.x}, ${unicornSighting.y})! It's name is ${unicorn.name}`,
        );
        this.emit(UNICORN_SIGHTING, unicornSighting);

        return this;
    }

    private pickARandomRainbow(): Rainbow | null {
        const visibleRainbows = this.rainbows.filter((rainbow) => rainbow.disappearedAt === null);
        if (!visibleRainbows.length) {
            return null;
        }

        return visibleRainbows[Math.floor(Math.random() * visibleRainbows.length)];
    }
}
