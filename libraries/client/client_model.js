/**
 * Created by Alizée Wickenheiser on 6/8/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import {Clients} from '../db/mongodb'

/**
 * @name getUUID
 * @description Get UUID of socket supplied.
 * @param socket
 * @param cb
 */
export function getUUID(socket, cb) {
    Clients.findOne({
        socketID: socket.id.toString(),
    }, (err, client) => {
        if (err || client == null)
            return cb({});
        return cb(client.uuid);
    });
}

/**
 * @name getSocketID
 * @description Get Socket ID by UUID supplied.
 * @param uuid
 * @param cb
 */
export function getSocketID(uuid, cb) {
    Clients.findOne({
        uuid: uuid
    }, (err, client) => {
        if (err || client == null)
            return cb({});
        return cb(client.socketID);
    });
}

/**
 * @name updateSocketID
 * @description Update Socket ID for socket supplied.
 * @param socket
 * @param cb
 */
export function updateSocketID(socket, cb) {
    Clients.update({
        uuid: socket.uuid,
        token: socket.token
    }, {
        $set: {socketID: socket.socketID,
            online: true,
            timestamp: new Date().getTime()}
    }, {
        upsert: true
    }, (err, client) => {
        if (err) return cb({uuid: socket.uuid, status: 401}); // update error
        return cb({uuid: socket.uuid, status: 201}); // SocketID and presence updated for device
    });
}

/**
 * @name registerSocket
 * @description Register Socket by user object supplied.
 * @param data
 * @param cb
 */
export function registerSocket(data, cb) {
    import uuid from 'uuid';
    data.uuid = data.uuid
        ? data.uuid
        : uuid.v4();

    /**
     * @name generateToken
     * @description generates random token of length 50
     * @returns {string}
     */
    const generateToken = () => {
        const rand = () => {
            // remove `0.' from '0.au34...` to get 'au34...
            return Math.random().toString(36).substr(2);
        };
        return (rand() + rand() + rand()).toString().substr(0, 50);
    };
    
    const channel = data.channel 
        ? data.channel 
        : 'main';
    const token = data.token 
        ? data.token 
        : generateToken();

    Clients.findOne({ uuid: data.uuid }, (err, client) => {
        if (client) { // exists in collection.
            data.uuid = uuid.v4();
        }
        client = new Clients({
            uuid: data.uuid,
            timestamp: new Date().getTime(),
            token: token,
            channel: channel,
            online: true
        });
        client.save((err, client) => {
            if (err) { // client not registered.
                cb({
                    errors: [{
                        message: 'Client not registered',
                        code: 500
                    }]
                });
            } else { // client registered.
                cb(client);
            }
        });
    });
}
