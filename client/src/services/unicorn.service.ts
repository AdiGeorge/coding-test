import { Unicorn } from '../models/unicorn';

export class UnicornService {
    private readonly unicorns: Unicorn[];

    constructor() {
        this.unicorns = [];
    }

    addUnicorn(unicorn: Unicorn): UnicornService {
        this.unicorns.push(unicorn);

        return this;
    }

    getUnicorns() {
        return this.unicorns;
    }

    getByKey(key: number): Unicorn {
        if (isNaN(key) || !this.unicorns.length || key > this.unicorns.length - 1 || key < 0) {
            return null;
        }

        return this.unicorns[key];
    }

    getRandomUnicorn(): Unicorn {
        if (!this.unicorns.length) {
            return null;
        }

        return this.unicorns[Math.floor(Math.random() * this.unicorns.length)];
    }
}
