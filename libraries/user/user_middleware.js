/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import config from '../../config';
import * as User from './user_model';

//-| login |------------------------------|
export function login(req, res, next) {
    if (req.session.user)
        return res.redirect('/home');

    let user = {
        username : req.body.username,
        password : req.body.password,
        ip : require('request-ip').getClientIp(req)
    };

    User.authenticate(user, function(err, dbUser) {
        if (err) return next(err);
        if (dbUser) { // details correct - login user.
            req.session.user = {
                id: dbUser.id,
                username: dbUser.username
            };
            res.redirect('/home');
        } else { // incorrect details
            res.redirect('/login');
        }
    });
}

//-| register |------------------------------|
export function register(req, res, next) {
    if (req.session.user)
        return res.redirect('/home');

    let user = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        gender : req.body.gender,
        ip : require('request-ip').getClientIp(req)
    };

    User.register(user, (err, status) => {
        if (err) return next(err);
        if (status == 'email already exists error')
            res.redirect('/register');
        else if(status === 'user already exists error')
            res.redirect('/register');
        else { // Create account.
            User.create(user, (err, dbUser) => {
                if (err) {
                    console.log('register create error: ' + err);
                    return next(err);
                }
                else {
                    User.authenticate(user, (err, dbUser) => {
                        if (err) {
                            console.log('user.authenticate error: ' + err);
                            return next(err);
                        }
                        else if (user) {
                            req.session.user = {
                                id: dbUser.id,
                                username: dbUser.username
                            };
                            res.redirect('/home');
                        } else {
                            res.redirect('/login');
                        }
                    })
                }
            });
        }
    });
}

//-| logout |------------------------------|
export function logout(req, res, next) {
    delete req.session.user;
    res.redirect('/home')
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
            username : data.username,
            password : data.password,
            ip : socket.request.connection.remoteAddress
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
            username : data.username,
            password : data.password,
            email : data.email,
            gender : data.gender,
            ip : socket.request.connection.remoteAddress
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
            } else if(status === 'user already exists error') {
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

    socket.on('get_avatar', data => {
        User.getUsersAvatars(data.usernames, (err, result) => {
            if (err) {
                console.log('get_avatar err ' + err);
                socket.emit('failure', {
                    api: 'avatar',
                    status: 'fetched avatars failed',
                    avatars: result,
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            } else {
                socket.emit('success', {
                    api: 'avatar',
                    status: 'avatars fetched',
                    avatars: result,
                    socketid: socket.id.toString(),
                    session: socket.handshake.session
                });
            }
        });
    });

    socket.on('update_avatar', data => {
        if (socket.handshake.session.user != null) {
            if (socket.handshake.session.user.username === data.username) {
                User.updateUserAvatar(data, (err, result) => {
                    if (err) {
                        console.log('update_avatar error: ' + err);
                        socket.emit('failure', {
                            api: 'avatar',
                            status: 'failed to update avatar',
                            socketid: socket.id.toString(),
                            session: socket.handshake.session
                        });
                    } else {
                        socket.emit('success', {
                            api: 'avatar',
                            status: 'updated avatar',
                            socketid: socket.id.toString(),
                            session: socket.handshake.session
                        });
                    }
                });
            }
        }
    });
}
