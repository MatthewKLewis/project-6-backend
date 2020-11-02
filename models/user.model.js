const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    rank: {
        type: String,
        required:true,
        enum:['user', 'fixer', 'dispatcher']
    },
    status: String,
    accountCreatedDate: Date,
    lastLoggedIn: Date,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]

});

module.exports = mongoose.model('User', userSchema)