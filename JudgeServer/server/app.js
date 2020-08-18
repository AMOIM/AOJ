import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';
import dotenv from 'dotenv';

import indexRoute from './routes/index.route.js';

import { logger } from './config/winston.js';
import { JudgeController } from './controller/judge.controller.js';
import syncQueue from 'sync-queue';

global.logger = logger;
global.Queue = new syncQueue();
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

app.use('/', indexRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// errorHandler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>logger.info('Successfully connected to mongodb'))
    .catch(e=>logger.error(e));

setInterval(() => {
    JudgeController.run();
} , 5000);

export default app;