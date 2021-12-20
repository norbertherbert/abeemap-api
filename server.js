import express, { json } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: new URL('./.env', import.meta.url) });
dotenv.config({ path: new URL('./.env-config', import.meta.url) });

const app = express();

// Middlewares

app.use(json());

// Routes

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
  console.log(`Abeemap API is listening at ${address.address}:${address.port} ...`);
});
