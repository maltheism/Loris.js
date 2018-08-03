/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import {Clients, User} from '../../db/mongodb'
import bcrypt from 'bcryptjs';

export function create(user, cb) {
    let uuid = require('uuid');
    user.uuid = uuid.v4();
    User.findOne({ uuid: user.uuid }, (err, dbObj) => {
        if (dbObj) { // exists in collection.
            user.uuid = uuid.v4();
        }
        let newUser = new User({
            email: user.email,
            uuid: user.uuid,
            password: hash(user.password)
        });
        newUser.save(err => {
            if (err) cb(err);
            else cb(null, newUser);
        });
    });
}

export function remove(id, cb) {
    User.remove({_id: id}, err => {
        cb(err);
    });
}

export function register(user, cb) {
    if (user.email && user.password) {
        User.findOne({'email': user.email}, (err, dbObj) => {
            if (err) return cb(err);
            if (dbObj) cb(null, '[error] Email previously registered');
            else cb(); // success.
        });
    } else {
        cb('error');
    }
}

export function authenticate(user, cb) {
    User.findOne({email: user.email},
        '-gender -avatar -name -location -contact -__v',
        function (err, dbObj) {
            if (err) cb(err);
            else if (dbObj && bcrypt.compareSync(user.password, dbObj.password)) {
                cb(null, dbObj);
            }
            else cb(null);
        }
    );
}

//-| get user by id |--------|
export function get(id, cb) {
    User.findOne({_id:id}, function (err, user) {
        if (err) cb(err);
        else cb(user);
    });
}

//-| get all users |--------------------|
export function all(cb) {
    User.find({}, function(err, users) {
        if (err) cb(err);
        else cb(users);
    });
}

//-| hash data 'a string' |---------|
const hash = (data) => {
    return bcrypt.hashSync(data, 8);
};
