const mongoose = require('../connection');

let emailRE = /@/ //I'll get a better one later

const userSchema = new mongoose.Schema({
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
        enum:['user', 'fixer', 'dispatcher']
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