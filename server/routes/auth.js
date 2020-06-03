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

router.put('/api/updateuser/:_id', requireLogin, (req, res)=>{
    const {name, password, photo} = req.body
    if(!name) {
        return res.status(422).json({error:"please fill name the fields"})
    }else if(!password){
        return res.status(422).json({error:"please fill password the fields"})
    }else if(!photo){
        return res.status(422).json({error:"please fill photo the fields"})
    }

    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        User.findByIdAndUpdate(req.params._id, {
            name,
            password: hashedPassword,
            photo
        }, {new: true})
        .then(user => {
            res.json({message:"successfully editted"})
            res.send(user)
        }).catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/api/updatenopass/:_id', requireLogin, (req, res)=>{
    const {name, photo} = req.body
    if(!name) {
        return res.status(422).json({error:"please fill name the fields"})
    }else if(!photo){
        return res.status(422).json({error:"please fill photo the fields"})
    }

    User.findByIdAndUpdate(req.params._id, {
        name,
        photo
    }, {new: true})
    .then(user => {
        res.json({message:"successfully editted"})
        res.send(user)
    }).catch(err => {
        console.log(err)
    })
})

router.put('/api/updatepic', requireLogin, (req, res) => {
    const {photo} = req.body
    User.findByIdAndUpdate(req.body._id, {
        photo
    }, {new: true})
    .then(user => {
        res.json({message:"successfully update photo"})
        res.send(user)
    }).catch(err => {
        console.log(err)
    })
})

router.delete('/api/deleteuser/:_id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params._id})
    .exec((err,user)=>{
        if(err || !user){
            return res.status(422).json({error:err})
        }
        if(user._id.toString() === req.user._id.toString()){
            user.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})

module.exports = router