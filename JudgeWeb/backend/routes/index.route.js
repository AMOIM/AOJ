import express from 'express';

import contestRoute from './contest.route.js';

const app = express();


app.use('/contest', contestRoute);

export default app;