const { ObjectID } = require('bson');
const mongoose = require('../connection');
const Schema = mongoose.Schema

let emailRE = /@/ //I'll get a better one later

const userSchema = new Schema({
    usernumber: Number,
    username: String,
    email: String,
    avatar: String,
    locatation: String,
    role: {
        type: String,
        enum:['user', 'fixer', 'dispatcher']
    },
    accountCreatedDate: String,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]

});

module.exports = mongoose.model('User', userSchema)