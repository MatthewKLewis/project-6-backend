const express = require('express')
const cors = require('cors')

const ProblemTicket = require('../models/problemTicket.model')
const User = require('../models/user.model')

router = express()
router.use(express.json())
router.use(cors())
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
router.post('/createTicket', (req,res) => {
    var tempTicket = new ProblemTicket(req.body);

    tempTicket.save().then(()=> {res.send('Problem Ticket Added')})
})

// POST new user
router.post('/createUser', (req,res) => {

    //the req.body is a user object from Discord. When this method is accessed, it should check to see if there is an identical document 
    //and create a new one if a document is not found

    User.findOne({username: req.body.username}).then((user)=> {
        if (user) res.send("Account Already Created")
        else {
            console.log('creating new user')
            var tempUser = new User({
                usernumber: req.body.usernumber,
                username: req.body.username,
                email: req.body.email,
                avatar: req.body.avatar,
                location: req.body.location,
                role: "user",
                accountCreateDate: Date.now(),
                tickets: []
            })
            tempUser.save().then(()=> {res.send(tempUser)})
        }
    })

    
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
    ProblemTicket.findByIdAndDelete(req.body)
        .then(()=> res.send('deleted.'))

})

module.exports = router