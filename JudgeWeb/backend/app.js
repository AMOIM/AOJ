import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';

import { logger } from './config/winston.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// middleware
// app.use(logger('dev'));
app.use(history());
app.use(cookieParser());

// express settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

export default app;