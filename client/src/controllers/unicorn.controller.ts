import { Request, Response } from 'express';
import { RestController } from '../decorators/rest.controller';
import { Get, Post } from '../decorators/rest.route';
import { UnicornService } from '../services/unicorn.service';

@RestController('/unicorns')
export class UnicornController {
    constructor(app: any, private readonly unicornService: UnicornService) {}

    @Get('/')
    getAll(req: Request, res: Response) {
        const unicorns = this.unicornService.getUnicorns();

        res.status(200);
        res.json({ unicorns });
    }

    @Get('/random')
    getRandom(req: Request, res: Response) {
        const unicorn = this.unicornService.getRandomUnicorn();

        res.status(200);
        res.json(unicorn);
    }

    @Get('/get_one_by_key')
    getOneByKey(req: Request, res: Response) {
        const unicorn = this.unicornService.getByKey(parseInt(req.query.key));

        res.status(200);
        res.json(unicorn);
    }

    @Post('/restricted_area')
    setRestrictedArea(req: Request, res: Response) {
        console.log(req.body);

        res.status(201);
        res.json({ success: true });
    }
}
