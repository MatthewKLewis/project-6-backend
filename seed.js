const mongoose = require('./connection')

const Users = require('./models/user.model')
const Tickets = require('./models/problemTicket.model')

const usersData = require('./seedData/users.json')
const ticketsData = require('./seedData/problemTickets.json')

Users.deleteMany({}).then(()=> {

    Users.insertMany(usersData).then(()=> {console.log('done')})

})

Tickets.deleteMany({}).then(()=> {

    Tickets.insertMany(ticketsData).then(()=> {console.log('done')})

})