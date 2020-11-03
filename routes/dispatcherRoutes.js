const express = require('express')

const ProblemTicket = require('../models/problemTicket.model')
const User = require('../models/user.model')

router = express()
router.use(express.json())
router.set('json spaces', 4)

//------------------------------------------------------GETS

// GET ALL tickets
router.get('/', (req,res) => {
    ProblemTicket.find({})
        .populate('originator').populate('assignedTo').populate('assignedBy')
        .then((data)=> {
            res.json(data);
        })
})

// GET SPECIFIC ticket
router.get('/ticket/:id', (req,res) => {
    ProblemTicket.findById(req.params.id)
        .populate('originator').populate('assignedTo').populate('assignedBy')
        .then((data)=> {
            res.json(data);
        })
})

// GET tickets by keyword
router.get('/keyword/:id', (req,res) => {
    res.json({message: `Tickets with the keyword: ${req.params.id}`})
})

// GET tickets by fixer
router.get('/fixer/:id', (req,res) => {
    res.json({message: `Tickets assigned to Fixer ${req.params.id}`})
})

// GET tickets by originator
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

// GET specific user
router.get('/manifest/:id', (req,res) => {
    User.findById({_id: req.params.id})
        .populate('tickets')
        .then((data)=> {
            res.json(data);
        })
})

//------------------------------------------------------POSTS

// POST new ticket
router.post('/ticket', (req,res) => {
    console.log('Hello');
})

//------------------------------------------------------PUTS


// ASSIGN ticket to fixer
router.put('/', (req,res) => {


})

// PROMOTE user to fixer or dispatcher
router.put('/', (req,res) => {


})

// CLOSE OUT ticket
router.put('/', (req,res) => {


})

//------------------------------------------------------DELETES


// DELETE ticket (I wonder if this should even be allowed?)
router.delete('/', (req,res) => {


})

module.exports = router