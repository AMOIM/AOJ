import express from 'express';
import problemRoute from './problem.route.js';

const app = express();

app.use('/problem', problemRoute);

export default app;