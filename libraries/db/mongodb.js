/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import config from '../../config';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.database.mongodb.use === 'deployment'
    ? config.database.mongodb.deployment
    : config.database.mongodb.development);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB -> connection error: '));

db.once('open', cb => {
    console.log('MongoDB -> open');
    config.database.mongodb.use === 'deployment'
        ? console.log('MongoDB -> URI: ' + config.database.mongodb.deployment)
        : console.log('MongoDB URL -> ' + config.database.mongodb.development);
});

// When the mongodb server goes down, mongoose emits a 'disconnected' event
mongoose.connection.on('disconnected', () => { console.log('MongoDB -> lost connection'); });
// The driver tries to automatically reconnect by default, so when the
// server starts the driver will reconnect and emit a 'reconnect' event.
mongoose.connection.on('reconnect', () => { console.log('MongoDB -> reconnected'); });

// Mongoose will also emit a 'connected' event along with 'reconnect'. These
// events are interchangeable.
mongoose.connection.on('connected', () => { console.log('MongoDB -> connected'); });

import {
    Schema_Client,
} from './schema/client';

import {Schema_User} from './schema/user';

export let User = mongoose.model('User', Schema_User);
export let Clients = mongoose.model('Client', Schema_Client);