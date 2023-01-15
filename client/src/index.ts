import { Manager } from 'socket.io-client';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { ProbeClient } from './clients/probe.client';
import { UnicornController } from './controllers/unicorn.controller';
import { UnicornService } from './services/unicorn.service';
import { RainbowService } from './services/rainbow.service';
import { RainbowController } from './controllers/rainbow.controller';
import { StatisticsController } from './controllers/statistics.controller';

const universeURL = process.env.UNIVERSE_URL ?? 'http://localhost:3000';

const manager = new Manager(universeURL, { autoConnect: true });
const socket = manager.socket('/');
const app = express();

// CHANGE PORT HERE:
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`ACCESS LOG: ${req.url}`);
    next();
});

const unicornService = new UnicornService();
const rainbowService = new RainbowService();

new ProbeClient(socket, unicornService, rainbowService);
new UnicornController(app, unicornService);
new RainbowController(app, rainbowService);
new StatisticsController(app, unicornService, rainbowService);

app.listen(port, () => {
    console.log(`Remote Universe HTTP Server started at http://localhost:${port}`);
});

console.log('Remote Universe Client App Started.');
