import express from 'express';
//import notice from './notice.route.js';
import user from './user.route.js';

const app = express();

app.use('/user', user);
//app.use('/notice', notice);

export default app;