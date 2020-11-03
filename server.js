//Dependencies
const express = require('express')


//Routes
const userRoutes = 1;
const fixerRoutes = 2;
const adminRoutes = 3;

const app = express()
const port = process.env.URI || 3000

app.get('/', (req,res)=> {
    res.send('Hello Worlds')
})

app.listen(port, ()=> {
    console.log(`Listening on Port ${port}`)
})