import express from 'express';
import problemRoute from './problem.route.js';
import contestRoute from './contest.route.js';

const app = express();

app.use('/problem', problemRoute);
app.use('/contest', contestRoute);

export default app;