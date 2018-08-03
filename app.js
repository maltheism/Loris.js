'use strict';

import helmet from 'helmet';
import express from 'express';

import config from './config';

import Session from 'express-session';
const MongoStore = require('connect-mongo')(Session);

import logger from 'morgan';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import ios from 'express-socket.io-session';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();
app.use(helmet());

const server = require('http').Server(app);
const io = require('socket.io')(server); // add socket.io 'websockets'.
server.listen(config.port.socket); // listen for websockets on port 6660

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//-| session |--------|
let session = Session({
    secret: config.security.cookie.secret,
    clear_interval: 3600,
    cookie: { // cookie stuff.
        maxAge: config.security.cookie.maxAge
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: config.database.mongodb.use === 'deployment'
            ? config.database.mongodb.deployment
            : config.database.mongodb.development,
        ttl: 7 * 24 * 60 * 60 // 7 days.
    })
});

app.use(session);

io.use(ios(session, {
    autoSave: true
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

//-| Socket.io Commands |-- -- -- -- -- -- -- -- -- [SEPARATOR] -|
io.on('connection', socket => {
    console.log('[*] Websocket connection found!' + '\n');

    const client = require('./libraries/client/client');
    client.socketHandler(socket);
    /* socketHandler [events] list.
     *   'client_identity' 'client_register' 'disconnect' 'message' 'error'
     *   'client_ready' 'client_error'
     */

    const user = require('./libraries/user/user');
    user.socketHandler(socket);
    /* socketHandler [events] list.
     *   'login'
     *   'logout'
     *   'register'
     *   'get_avatar'
     *   'update_avatar'
     *   'create_lyrics_transcription_request'
     */

});

module.exports = app;
