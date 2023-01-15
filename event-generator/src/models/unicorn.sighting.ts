import { Unicorn } from './unicorn';

export class UnicornSighting {
    public readonly x: number;

    public readonly y: number;

    constructor(public readonly unicorn: Unicorn) {
        this.x = Math.floor(Math.random() * 200) - 100;
        this.y = Math.floor(Math.random() * 200) - 100;
    }
}
