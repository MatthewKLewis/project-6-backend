const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/problems', {useNewUrlParser:true, useUnifiedTopology:true});
module.exports = mongoose;