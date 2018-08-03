/**
 * Created by Alizée Wickenheiser on 6/8/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

import * as Client from './model/model'

export function socketHandler(socket) {

    /**
     * Send client_identity message.
     */
    socket.emit('client_identity', {socketid: socket.id.toString()});

    /**
     * Received client_identity message.
     */
    socket.on('client_identity', function(data) {

        data['socketId'] = socket.id.toString();

        Client.updateSocketID(data, function(auth) {
            if (auth.status === 201) {
                socket.emit('client_ready', {
                    api: 'connect',
                    status: auth.status,
                    socket: {
                        id: socket.id.toString(),
                        uuid: data.uuid
                    }
                });
                socket.join(data.uuid); // each socket can be reached by their uuid as channel.
            } else {
                socket.emit('client_error', {
                    api: 'connect',
                    status: auth.status,
                    socket: {
                        id: socket.id.toString(),
                        uuid: data.uuid
                    }
                });
            }
        });
    });

    /**
     * Received client_register message.
     */
    socket.on('client_register', function(data, fn) {
        if (data === undefined)
            data = {};

        data['socketId'] = socket.id.toString();

        Client.getUUID(socket, function(uuid) {
            Client.registerSocket(data, function(results) {
                try {
                    fn(results);
                } catch(error) {
                    console.log('client_register error: ' + error);
                }
            });
        });
    });

    /**
     * Received disconnect message.
     */
    socket.on('disconnect', function(data) {
        Client.getUUID(socket, function(uuid) {
            socket.broadcast.emit('message', {
                api: 'disconnect',
                client: uuid
            });
        });
    });

    /**
     * Received message.
     */
    socket.on('message', function(data) {
        if (data === undefined)
            data = {};
        else if (typeof data !== 'object')
            data = JSON.parse(data);

        Client.getUUID(socket, function(uuid) {

            console.log(data.clients);

            let send = {
                sender: uuid,
                type: data.clients === ('all' || '*')
                    ? 'broadcast'
                    : 'message',
                message: data.message == null
                    ? ''
                    : data.message
            };

            console.log(JSON.stringify(send));

            if (data.clients === 'all' || data.clients === '*') // 'broadcast' message to everyone
                socket.broadcast.emit('message', send);
            else {
                let clients = data.clients;
                if (typeof clients === 'string')
                    clients = [clients];
                clients.forEach(function(client) {
                    Client.getSocketID(client, function(socketId) {
                        console.log('[*] sent message to client with socketId: ', socketId);
                        socket.to(socketId).emit('message', send);
                    });
                    //console.log('broadcasting to client channel: ' + client);
                    //socket.broadcast.to(client).emit('message', send); // 'channel' message to specific clients
                });
            }
        });
    });

    /**
     * Socket error occurred.
     */
    socket.on('error', function(error) {
        console.log('socket error: ' + error);
    });
}