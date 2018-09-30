import { Application, default as express } from 'express';
import { Server } from 'http';

import Gun from 'gun';
import 'gun/nts';

import path from 'path';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 8765;

const app: Application = express();

app.use(Gun.serve);

const server: Server = app.listen(PORT, HOST);

Gun({ file: path.resolve(__dirname, '../data'), web: server });

console.log(`Gun server listening on http://localhost:${PORT}/gun`);