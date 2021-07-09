const mongoose = require('mongoose')

const Claim = mongoose.Schema({
    policyNumber:{
        type: String,
    },
    causeOfLoss:{
        type: String,
    },
    driverName:{
        type: String,
    },
    dlNumber:{
        type: String,
    },
    dlClass:{
        type: String,
    },
    dlType:{
        type: String,
    },
    dlExpiryDate:{
        type: Date,
    },
    vehicalLocation:{
        type: String,
    },
    photos:{
        type: Buffer
    },
})
const claim = mongoose.model('Claim', Claim);

module.exports = claim