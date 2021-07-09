const mongoose = require('mongoose')

const User = mongoose.Schema({
    policyNumber:{
        type: String,
    },
    registrationNumber:{
        type: String,
    }
})
const user = mongoose.model('User', User);

module.exports = user