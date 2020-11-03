const { ObjectID } = require('bson');
const mongoose = require('../connection');
const Schema = mongoose.Schema

let emailRE = /@/ //I'll get a better one later

const userSchema = new Schema({
    _id: ObjectID,
    name: String,
    email: {
        type: String,
        validate: {
            validator: function(v){
            return emailRE.test(v)
            },
        required:true
        }
    },
    rank: {
        type: String,
        enum:['client', 'fixer', 'dispatcher']
    },
    status: {
        type: String,
        enum:['active', 'away', 'vacation']
    },
    accountCreatedDate: Date,
    lastLoggedIn: Date,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]

});

module.exports = mongoose.model('User', userSchema)