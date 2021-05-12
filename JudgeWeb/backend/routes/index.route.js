import express from 'express';
import problemRoute from './problem.route.js';
import contestRoute from './contest.route.js';
import userRoute from './user.route.js';
import checkRoute from './check.route.js';
import markdownRoute from './markdown.route.js';

const app = express();

app.use('/check', checkRoute);
app.use('/user', userRoute);
app.use('/problem', problemRoute);
app.use('/contest', contestRoute);
app.use('/markdown', markdownRoute);

export default app;