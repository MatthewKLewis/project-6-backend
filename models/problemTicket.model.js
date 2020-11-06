const mongoose = require('../connection');
const Schema = mongoose.Schema

const problemTicketSchema = new Schema({
    createdOn: Date,
    assignedOn: Date,
    title: String,
    message: String,
    originator: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Ticket', problemTicketSchema)