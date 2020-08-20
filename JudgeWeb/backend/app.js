import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { logger } from './config/winston.js';
import indexRoute from './routes/index.route.js';

global.logger = logger;
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// middleware
// app.use(logger('dev'));
app.use(history());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express settings
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', indexRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// errorHandler
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    logger.error(err.message);
    return res.status(err.status || 500).json({message : err.message});
});

mongoose.connect(process.env.MONGO_URI)
    .then(()=>logger.info('Successfully connected to mongodb'))
    .catch(e=>logger.error(e));

export default app;