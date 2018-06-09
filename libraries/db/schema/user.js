/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

const Schema_User = mongoose.Schema({
    username: String,
    gender: String,
    password: String,
    avatar: String,
    currency: {
        type: String,
        default: '$0.00'
    },
    name: {
        title: String,
        first: String,
        last: String,
    },
    location: {
        street: String,
        city: String,
        state: String,
        postal_code: String,
        country: String
    },
    contact: {
        phone: {
            cell: String,
            home: String
        },
        email: String,
    },
    info: {
        birthday : String,
        ip : {
            login : {
                now: String,
                previous: String,
                history: {
                    type: Array,
                    default: []
                }
            }
        },
        date : {
            registration: {
                type: Date,
                default: Date.now
            },
            login: {
                now : Date,
                previous : Date,
                history : {
                    type: Array,
                    default: []
                }
            }
        }
    }
});

export { Schema_User };