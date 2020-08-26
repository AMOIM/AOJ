import express from 'express';
import notice from './notice.route.js';

const app = express();

app.use('/notice', notice);

export default app;