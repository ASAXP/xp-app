import express from 'express';
import * as path from 'path';
import { v1Routes } from './routes/v1';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', v1Routes);

export { app };
