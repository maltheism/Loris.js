/**
 * Created by Alizée Wickenheiser on 6/9/18.
 * Les contes de fées sont faits pour être défaits...
 */

'use strict';

const Schema_Market = mongoose.Schema({
    _id: Number,
    id : String,
    name : String,
    album : String,
    artist : String,
    language : {
        song : {
            name: String,
            native: String,
            code: String
        },
        transcribe : {
            name: String,
            native: String,
            code: String
        }
    },
    album_art : String,
    username : String,
    lyrics_id : String,
    likes : String,
    bounty : {
        total: String,
        details : Array
    },
    date : {
        type: Date,
        default: Date.now
    }
}, { _id: false });

export {Schema_Market};