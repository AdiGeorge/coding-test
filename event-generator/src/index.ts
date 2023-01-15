import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Universe } from './models/universe';

const httpServer = createServer();
const probe = new Server(httpServer);

const kindlands = Universe.getUniverse();

probe.on('connection', (observer) => {
    const observerId = uuidv4();
    console.log(`Client connected. Generated id: ${observerId}`);
    // eslint-disable-next-line
    // @ts-ignore
    observer.observerId = observerId;

    kindlands.registerClient(observer);

    observer.on('disconnect', () => {
        // eslint-disable-next-line
        // @ts-ignore
        const observerId = observer.observerId;
        kindlands.unregisterClient(observerId);
    });
});

// CHANGE PORT HERE:
httpServer.listen(3000, () => {
    console.log('Server started on port 3000.');
});

kindlands.attachWebSocketServer(probe).goLive();
