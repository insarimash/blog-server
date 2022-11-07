const { request, response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sign } = require('../token')

const router = express.Router();

const User = mongoose.model('User');

router.post('/singup', async(req, res) => {
    const {login, password} = req.body;

    const user = new User({
        login,
        password_hash: bcrypt.hashSync(password, 10)
    })

    try{
        await user.save();
        res.send({message: 'User created'})
        const token = sign({userId: user._id,});
        res.send({ token})
    } catch(err){
        res.status(400).send({ message: err.message});
    }
})

router.post('/login', async(req, res) => {

    const { login, password} = req.body

    const user = await User.findOne({login})

    if(!user){
        return res.status(422).send({ message: 'User does not exist' })
    }
    
    if(bcrypt.compareSync(password, user.password_hash)){
        const token = sign({userId: user._id,});
        res.send({ token })
    }else{
        res.status(401).send({message: "Login or password is incorrect"});
    }
})

module.exports = router;
