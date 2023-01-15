import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, colors, names } from 'unique-names-generator';

export class Unicorn {
    private readonly _id: string;

    private readonly _name: string;

    constructor() {
        this._id = uuidv4();
        this._name = uniqueNamesGenerator({
            dictionaries: [colors, names],
            separator: ' ',
            style: 'capital',
            length: 2,
        });
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public toJson(): string {
        let json = JSON.stringify(this);
        Object.keys(this)
            .filter((key) => key[0] === '_')
            .forEach((key) => {
                json = json.replace(key, key.substring(1));
            });

        return json;
    }
}
