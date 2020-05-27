const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys")
const requireLogin = require("../middlewere/requireLogin")

router.post('/protected', requireLogin, (req, res) => {
    res.send("Hello user")
})

router.post('/register', (req, res) => {
    res.send("Hello FUCKING")
    const {name, phone, email, password} = req.body
    if(!name || !phone || !email || !password){
        return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(savedUser){
            return res.status(422).json({error:"user already exist with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email,
                name,
                phone,
                password:hashedPassword
            })
    
            user.save()
            .then(user => {
                res.json({message:"successfully register"})
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/login', (req, res) =>  {
    const {email, password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please fill email and password"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message:"usccessfully logged in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
            }else{
                return res.status(422).json({error:"invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

module.exports = router