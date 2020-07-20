import express from 'express';
import mongoose from 'mongoose';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import history from 'connect-history-api-fallback';

// db connect
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/mongodb_tutorial');

const app = express();

// middleware
app.use(logger('dev'));
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
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;