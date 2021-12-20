import express, { json } from 'express';
import dotenv from 'dotenv';

import logger from './logger.js';

import webappAPIRouter from './routes/webapp-api.router.js';
import uplinkStreamAPI from './routes/uplink-stream-api.router.js';

dotenv.config({ path: new URL('./config/.env', import.meta.url) });
dotenv.config({ path: new URL('./config/default.env', import.meta.url) });

const app = express();

// Middlewares

app.use(json());
app.use((req, res, next) => {
  logger.debug(`${req.socket.remoteAddress}:${req.socket.remotePort} ${req.method} ${req.path}`);
  next();
});

// Routes

app.use('/webapp/v1', webappAPIRouter);
app.use('/uplink-stream/v1', uplinkStreamAPI);

app.get('/test', (req, res) => {
  res.write('The server works\n');
  res.status(200).end();
});

// Error handling

app.use((req, res) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  res.status(500).end();
  next(err);
});

// Start server

const server = app.listen(process.env.ABEEMAP_API_SERVER_PORT, () => {
  const address = server.address();
  logger.info(`Abeemap API is listening at ${address.address}:${address.port} ...`);
});
