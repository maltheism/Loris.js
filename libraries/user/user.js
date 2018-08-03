/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import * as User from './model/model';

//-| login |------------------------------|
export function login(req, res, next) {
    if (req.session.user) {
        res.cookie('session', JSON.stringify({
            user: req.session.user
        }));
        return res.redirect('/');
    }

    const user = {
        email : req.body.email,
        password : req.body.password
    };

    User.authenticate(user, (err, dbUser) => {
        if (err) return next(err);
        if (dbUser) { // details correct - login user.
            req.session.user = {
                id: dbUser.id,
                email: dbUser.email
            };
            res.cookie('session', JSON.stringify({
                user: req.session.user
            }));
            res.redirect('/');
        } else { // incorrect details
            res.redirect('/login');
        }
    });
}

//-| register |------------------------------|
export function register(req, res, next) {
    if (req.session.user) {
        res.cookie('session', JSON.stringify({
            user: req.session.user
        }));
        return res.redirect('/');
    }

    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({
            response: {
                code: 1,
                description: 'Please select captcha'
            }
        });
    }

    let user = {
        email : req.body.email,
        password : req.body.password
    };

    const https = require('https');
    const url = 'https://www.google.com/recaptcha/api/siteverify?secret=' +
        '6Ld0gWEUAAAAAB993WqFavGIslEpDtrxNBJr2Nqr' +
        '&response=' + req.body['g-recaptcha-response'] +
        '&remoteip=' + req.connection.remoteAddress;

    https.get(url, response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            if(body.success !== undefined && !body.success) {
                return res.json({
                    responseCode: 1,
                    responseDesc: 'Failed captcha verification'
                });
            } else {
                User.register(user, (err, status) => {
                    if (err) return next(err);
                    if (status === '[error] Email previously registered')
                        res.redirect('/register');
                    else { // Create account.
                        User.create(user, (err, dbObj) => {
                            if (err) {
                                console.log('[register] create error: ' + err);
                                return next(err);
                            }
                            else {
                                User.authenticate(user, (err, dbObj) => {
                                    if (err) {
                                        console.log('[register] user.authenticate error: ' + err);
                                        return next(err);
                                    }
                                    else if (user) {
                                        req.session.user = {
                                            id: dbObj.id,
                                            email: dbObj.email
                                        };
                                        res.cookie('session', JSON.stringify({
                                            user: req.session.user
                                        }));
                                        res.redirect('/');
                                    } else {
                                        res.redirect('/login');
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    });
}

//-| logout |------------------------------|
export function logout(req, res, next) {
    if (req.session.user) {
        req.session.destroy(function (err) {
            if (err) return next(err);
            res.clearCookie('adultplay');
            res.redirect('/');
        });
    } else {
        res.clearCookie('adultplay');
        res.redirect('/');
    }
}

//-| authorize address to only registered users |--|
export function authorize(req, res, next) {
    if (req.session.user)
        next();
    else res.redirect('/login')
}

export function isLogin(req, res, next) {
    if (req.session.user)
        res.redirect('/home');
    else next();
}

//-| socket handler |------------------|
export function socketHandler(socket) {

    socket.on('login', data => {

        let user = {
            username: data.username,
            password: data.password,
            ip: socket.request.connection.remoteAddress
        };

        User.authenticate(user, (err, dbUser) => {
            if (err) { // handle error.
                console.log('socket.login error: ' + err);
                socket.emit('failure', {
                    api: 'login',
                    status: 'service offline',
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            }
            if (dbUser) { // credentials correct - login user.
                console.log('user data ' + JSON.stringify(dbUser));
                socket.handshake.session.user = {
                    id: dbUser.id,
                    username: dbUser.username
                };
                console.log('session data ' + JSON.stringify(socket.handshake.session.user));
                socket.handshake.session.save();
                socket.emit('success', {
                    api: 'login',
                    status: 'online',
                    details: {
                        currency: dbUser.currency
                    },
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            } else { // credentials incorrect - login failed.
                socket.emit('failure', {
                    api: 'login',
                    status: 'incorrect details',
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            }
        });
    });

    socket.on('logout', () => {
        if (socket.handshake.session.user != null) {
            if (socket.handshake.session.user) {
                delete socket.handshake.session.user;
                socket.handshake.session.save();
            }
            socket.emit('success', {
                api: 'logout',
                status: 'user session removed',
                socketid: socket.id.toString(),
                session: socket.handshake.session
            });
        }
    });

    socket.on('register', data => {
        console.log('on register has just ran');
        let user = {
            username: data.username,
            password: data.password,
            email: data.email,
            gender: data.gender,
            ip: socket.request.connection.remoteAddress
        };
        User.register(user, (err, status) => {
            if (err) {
                console.log('socket.register error: ' + err);
                socket.emit('failure', {
                    api: 'register',
                    status: 'service offline',
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            } else if (status === 'email already exists error') {
                socket.emit('failure', {
                    api: 'register',
                    status: 'email exists',
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            } else if (status === 'user already exists error') {
                socket.emit('failure', {
                    api: 'register',
                    status: 'username exists',
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            } else { // Create account.
                User.create(user, (err, user) => {
                    if (err) {
                        console.log('socket.create error: ' + err);
                        socket.emit('failure', {
                            api: 'register',
                            status: 'service offline',
                            socketid: socket.id.toString(),
                            session: socket.handshake.session
                        });
                    }
                    else {
                        User.authenticate(user, (err, dbUser) => {
                            if (err) { // handle error.
                                console.log('socket.login error: ' + err);
                                socket.emit('failure', {
                                    api: 'login',
                                    status: 'service offline',
                                    socketid: socket.id.toString(),
                                    session: socket.handshake.session
                                });
                            }
                            if (dbUser) { // credentials correct - login user.
                                socket.handshake.session.user = {
                                    id: dbUser.id,
                                    username: dbUser.username
                                };
                                socket.handshake.session.save();
                                socket.emit('success', {
                                    api: 'login',
                                    status: 'online',
                                    details: {
                                        currency: dbUser.currency
                                    },
                                    socketid: socket.id.toString(),
                                    session: socket.handshake.session
                                });
                            }
                        })
                    }
                });
            }
        });
    });

}
