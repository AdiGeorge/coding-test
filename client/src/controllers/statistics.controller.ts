import { Request, Response } from 'express';
import { RestController } from '../decorators/rest.controller';
import { Get } from '../decorators/rest.route';
import { RainbowService } from '../services/rainbow.service';
import { UnicornService } from '../services/unicorn.service';

@RestController('/statistics')
export class StatisticsController {
    constructor(
        app: any,
        private readonly unicornService: UnicornService,
        private readonly rainbowService: RainbowService,
    ) {}

    @Get('/')
    statistics(req: Request, res: Response) {
        res.status(200);
        res.json({
            statistics: 'here',
        });
    }
}
