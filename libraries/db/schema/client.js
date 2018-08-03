/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

const mongoose = require('mongoose');

const Schema_Client = mongoose.Schema({
    socketId: String,
    uuid: String,
    token: String,

    channel: String,
    online: false,

    timestamp: Date
});

const Schema_PublicKeys = mongoose.Schema({
    socket_id: String,
    publicKeyServer: String,
    secretKeyServer: String
});

const Schema_Forge = mongoose.Schema({
    socket_id: String,
    key: String,
    iv: String
});

export {Schema_Client, Schema_PublicKeys, Schema_Forge};