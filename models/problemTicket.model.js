const mongoose = require('mongoose');

const problemTicketSchema = new mongoose.Schema({
    createdOn: Date,
    assignedOn: Date,
    title: String,
    message: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Problem Ticket', problemTicketSchema)