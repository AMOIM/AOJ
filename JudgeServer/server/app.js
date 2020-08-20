import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { logger } from './config/winston.js';
import syncQueue from 'sync-queue';
import Judge from './controller/judge.controller.js';

global.logger = logger;
global.Queue = new syncQueue();
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true})
    .then(()=>logger.info('Successfully connected to mongodb'))
    .catch(e=>logger.error(e));

setInterval(()=>{
    Judge.run();
}, process.env.TIMEOUT || 5000);

export default app;