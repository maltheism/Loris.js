/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import config from './../../config';

import {User} from '../db/mongodb'
import bcrypt from 'bcryptjs';

import fs from 'fs';
import storage from '@google-cloud/storage';
let gcs = storage({
        projectId: 'intralizee',
        keyFilename: config.gcloud.use === 'deployment'
            ? config.gcloud.deployment
            : config.gcloud.development
    }),
    bucket_avatars = gcs.bucket('loris-user-avatars');

export function create(user, cb) {
    let dbUser = new User({
        username : user.username,
        password : hash(user.password),
        gender : user.gender,
        currency : '$0.00',
        contact : {
            email : user.email
        }
    });
    dbUser.save(err => {
        if (err) cb(err);
        else cb(null, dbUser);
    });
}

export function remove(id, cb) {
    User.remove({_id: id}, err => {
        cb(err);
    });
}


export function register(user, cb) {
    if (user.username && user.email && user.password) {
        User.findOne({'contact.email': user.email}, (err, dbUser) => {
            if (err)
                return cb(err);
            if (dbUser)
                cb(null, 'email already exists error');
            else
                User.findOne({username: user.username}, (err, dbUser) => {
                    if (err) return cb(err);
                    if (dbUser) cb(null, 'user already exists error');
                    else cb();
                });
        });
    } else {
        cb('error');
    }
}

export function authenticate(user, cb) {
    User.findOne({username: user.username},
        '-gender -avatar -name -location -contact -__v',
        function (err, dbUser) {
            if (err) cb(err);
            else if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
                storeLoginInformation(dbUser, user.ip);
                cb(null, dbUser);
            }
            else cb(null);
        }
    );
}

//-| get user by id |----------------------|
export function get(id, cb) {
    User.findOne({_id:id}, function (err, user) {
        if (err) cb(err);
        else cb(user);
    });
}

//-| get all users |-------------------|
export function all(cb) {
    User.find({}, function(err, users) {
        if (err) cb(err);
        else cb(users);
    });
}

//-| hash data 'a string' |----------------|
const hash = (data) => {
    return bcrypt.hashSync(data, 8);
};

//-| store user IP Address and time of login.
const storeLoginInformation = (user, ip) => {
    if (user.info.ip.login.now != null)
        user.info.ip.previous = user.info.ip.now;
    if (user.info.date.login.now != null)
        user.info.date.login.previous = user.info.date.login.now;
    user.info.date.login.now = Date.now();
    user.info.date.login.history.push( {
        date: Date.now()
    });
    user.info.ip.login.now = ip;
    user.info.ip.login.history.push({
        ip: ip
    });
    user.save();
};

export function getUsersAvatars(users, cb) {
    let search = [];
    for (let i in users)
        search.push({username : users[i]});
    // Search for {username: example1}, {username: example2}, ...
    User.find({
        '$or': search
    }, '-gender -password -name -location -contact -info -__v -_id', function(err,result) {
        if (err) cb(err);
        console.log('result is ' + result);
        cb(null, result);
    });
}

export function updateUserAvatar(data, cb) {
    User.findOne({username: data.username}, (err, user) => {
        if (err) cb(err);
        if (user) {
            //user.avatar = data.avatar;
            fs.writeFile('./lib/user/avatars_tmp/' + user.username, data.avatar, { flag : 'w' }, err => {
                if (err)
                    console.log('writing file err: ' + err);
                else {
                    console.log('file written');

                    bucket_avatars.upload('./lib/user/avatars_tmp/' + user.username, (err, file) => {
                        if (err)
                            console.log('upload avatar err: ' + err);
                        else {
                            console.log('its now in my bucket');
                            user.avatar = 'https://storage.googleapis.com/lyrics-user-avatars/' + user.username;
                            fs.unlink('./lib/user/avatars_tmp/' + user.username, err => {
                                if (err) console.log('delete avatar err: ' + err);
                            });
                            user.save(function (err) {
                                if (err) cb(err);
                                cb(null, 'success');
                            });
                        }
                    });
                }
            });
        }
    });
}
