import express from 'express';
import * as path from 'path';
import { v1Routes } from './routes/v1';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false} ));

// routes
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', v1Routes);

app.use(ErrorHandler);
app.use((req, res) => res.status(404).send('The requested page could not be found.'));

export { app };
