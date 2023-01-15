import { TimeMarkers } from './time.markers';

export class Rainbow {
    public readonly id: string;
    private timeMarkers: TimeMarkers;

    constructor(id: string) {
        this.id = id;
        this.timeMarkers = {
            appeared: null,
            disappeared: null,
        };
    }

    setAppearTime(time: Date): Rainbow {
        this.timeMarkers.appeared = time;

        return this;
    }

    setDisappearTime(time: Date): Rainbow {
        this.timeMarkers.disappeared = time;

        return this;
    }
}
