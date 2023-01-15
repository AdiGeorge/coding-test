import { v4 as uuidv4 } from 'uuid';

export class Rainbow {
    private readonly _id: string;

    private readonly _appearedAt: Date;

    private _disappearedAt: Date | null;

    constructor() {
        this._id = uuidv4();
        this._appearedAt = new Date();
        this._disappearedAt = null;
    }

    public get id(): string {
        return this._id;
    }

    public get appearedAt(): Date {
        return this._appearedAt;
    }

    public get disappearedAt(): Date | null {
        return this._disappearedAt;
    }

    public makeDisappear(): Rainbow {
        this._disappearedAt = new Date();

        return this;
    }
}
