import { Request, Response } from 'express';
import { RestController } from '../decorators/rest.controller';
import { Get } from '../decorators/rest.route';
import { RainbowService } from '../services/rainbow.service';

@RestController('/rainbows')
export class RainbowController {
    constructor(app: any, private readonly rainbowService: RainbowService) {}

    @Get('/')
    getAll(req: Request, res: Response) {
        const rainbows = this.rainbowService.getRainbows();

        res.status(200);
        res.json(rainbows);
    }
}
