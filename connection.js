const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/problems')

module.exports = mongoose;