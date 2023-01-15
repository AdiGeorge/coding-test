import { Rainbow } from '../models/rainbow';
import { Dictionary } from '../models/dictionary';
import { RainbowAppearedEvent } from '../models/rainbow.appeared.event';

export class RainbowService {
    private rainbows: Dictionary<Rainbow> = {};

    addRainbow(rainbowAppearedEvent: RainbowAppearedEvent): RainbowService {
        const rainbow = new Rainbow(rainbowAppearedEvent.id);
        rainbow.setAppearTime(rainbowAppearedEvent.time);

        this.rainbows[rainbow.id] = rainbow;

        return this;
    }

    getRainbows(): Dictionary<Rainbow> {
        return this.rainbows;
    }
}
