/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import config from '../../config';

const mongoose = require('mongoose'),
    paginate = require('mongoose-paginate'),
    AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.Promise = global.Promise;
mongoose.connect(config.database.mongodb.use === 'deployment' ? config.database.mongodb.deployment : config.database.mongodb.development);

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
    Schema_Forge,
    Schema_PublicKeys
} from './schema/client';

import {Schema_User} from 'schema/user';

import {Schema_Market} from 'schema/market';
Schema_Market.plugin(AutoIncrement);
Schema_Market.plugin(paginate);

export let Market = mongoose.model('Market', Schema_Market);

export let User = mongoose.model('User', Schema_User);
export let Clients = mongoose.model('Client', Schema_Client);

export let Forges = mongoose.model('Forge', Schema_Forge);
export let PublicKeys = mongoose.model('PublicKeys', Schema_PublicKeys);
