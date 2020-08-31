import express from 'express';
import problemRoute from './problem.route.js';
import contestRoute from './contest.route.js';
import userRoute from './user.route.js';

const app = express();

app.use('/user', userRoute);
app.use('/problem', problemRoute);
app.use('/contest', contestRoute);

export default app;