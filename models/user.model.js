const { ObjectID } = require('bson');
const mongoose = require('../connection');
const Schema = mongoose.Schema

let emailRE = /@/ //I'll get a better one later

const userSchema = new Schema({
    //_id: ObjectID,
    username: String,
    email: String,
    avatar: String,
    locate: String,
    role: {
        type: String,
        enum:['client', 'fixer', 'dispatcher']
    },
    accountCreatedDate: Date,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]

});

module.exports = mongoose.model('User', userSchema)