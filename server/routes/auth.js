const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../keys")
const requireLogin = require("../middlewere/requireLogin")

router.post('/api/register', (req, res) => {
    const {name, phone, email, password, photo} = req.body
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
                password:hashedPassword,
                photo
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

router.post('/api/login', (req, res) => {
    const {email, password} = req.body
    if(!email ||  !password){
        return res.status(422).json({err:"please add email and password"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return  res.status(422).json({err:"Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message:"Sign In Successfuly"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id, name, email, phone, photo} = savedUser
                res.json({token, user:{_id, name, email, phone, photo}})
            }else{
                return res.status(422).json({err:"Invalid password"})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

router.put('/api/updateuser/:id', requireLogin, (req, res)=>{
    if(!req.body) {
        return res.status(422).json({error:"please fill all the fields"})
    }

    // Find user and update it with the request body
    bcrypt.hash(req.body.password, 12)
    .then(hashedPassword => {
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            password: hashedPassword,
            photo: req.body.photo
        }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(422).json({error:"user not found with id "  + req.params.id})
            }else{
                res.json({message:"successfully editted"})
                res.send(user)
            }
        }).catch(err => {
            return res.status(422).json({error:"user not found with id "  + req.params.id})
        });  
    })
})

module.exports = router