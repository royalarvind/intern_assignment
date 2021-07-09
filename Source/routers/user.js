const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const Claim = require('../models/claim')
const mongoose = require('mongoose')
const router = new express.Router()

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/user/login',async (req,res)=>{
    try{
        const user = await User.findOne({policyNumber: req.body.policyNumber, registrationNumber: req.body.registrationNumber})
        if(!user){
            res.status(400).send({message:"Please enter correct details"})
        }
        res.status(200).send({message:"successfully authenticated"})
    }catch(e){
        console.log(e.message)
        res.status(400).send(e)
    }
})
// Create a new request 
router.post('/user-details', async (req, res)=>{
    const user = new User({...req.body})
    try {
        await user.save()
        res.status(201).send({user})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/claim-details',upload.single('photo'), async (req, res)=>{
    try{
        const claim = new Claim({
            policyNumber : req.body.policyNumber,
            causeOfLoss : req.body.causeOfLoss,
            driverName: req.body.driverName,
            dlNumber: req.body.dlNumber,
            dlClass: req.body.dlClass,
            dlType: req.body.dlType,
            dlExpiryDate: new Date(req.body.dlExpiryDate),
            photos: req.file.buffer
        });
        await claim.save()
        res.status(201).send({status: "successfully saved details", claim})
    } catch(err){
        res.status(500).send({err: err.message});
    }  
},(error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/claim-details', async (req, res)=>{
    try {
        const details = await Claim.findOne({ policyNumber: req.body.policyNumber})
        if(!details){
            return res.status(404).send({details})
        }
        res.status(200).send(details)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router