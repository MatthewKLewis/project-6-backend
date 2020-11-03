const express = require('express')

const ProblemTicket = require('../models/problemTicket.model')
const User = require('../models/user.model')

router = express()
router.use(express.json())
router.set('json spaces', 4)

// Dispatcher Home Page: List of 10 most recent tickets
// Populate originator, assignedTo, and assignedBy
router.get('/', (req,res) => {
    ProblemTicket.find({})
        .populate('originator').populate('assignedTo').populate('assignedBy')
        .then((data)=> {
            res.json(data);
        })
})

// GET tickets by keyword
router.get('/keyword/:keyword', (req,res) => {
    res.json({message: `Tickets with the keyword: ${req.params.keyword}`})
})

// GET specific ticket
router.get('/ticket/:id', (req,res) => {
    res.json({message: 'a specific ticket'})
})

// GET tickets assigned to specific fixers
router.get('/fixer/:id', (req,res) => {
    res.json({message: `Tickets assigned to Fixer ${req.params.id}`})
})

// GET tickets sent by specific users
router.get('/user/:id', (req,res) => {
    res.json({message: `Tickets from User ${req.params.id}`})
})

// GET list of other users
router.get('/manifest', (req,res) => {

    User.find({})
        .populate('tickets')
        .then((data)=> {
            res.json(data);
        })
})

//------------------------------------------------------

// POST new ticket
router.post('/ticket', (req,res) => {


})

// ASSIGN ticket to fixer
router.put('/', (req,res) => {


})


// DELETE ticket (I wonder if this should even be allowed)
router.delete('/', (req,res) => {


})

module.exports = router