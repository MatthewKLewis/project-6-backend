//Dependencies
const express = require('express')


//Routes
const userRoutes = 1;
const fixerRoutes = 2;
const adminRoutes = 3;

const app = express()
const port = process.env.URI || 3000

app.get('/', (req,res)=> {
    res.send(
    `
        <h1>Problem Ticket Manager</h1>
        <a href='/dispatchers'>Dispatchers</a>
        <a href='/fixers'>Fixers</a>
        <a href='/users'>Users</a>
    `)
})

app.use('/dispatchers', require('./routes/dispatcherRoutes'))

app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`)
})