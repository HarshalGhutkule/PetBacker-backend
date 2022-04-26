const User = require("../models/UserModel")
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const { sendMail } = require("../config/mail");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

const createToken = (user)=>{
    return jwt.sign({user}, 'shhhhh');
}

const register = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({Email:req.body.Email}).lean().exec();

        if(user) return res.status(400).send({message:"Please try another mail"});

        user = await User.create(req.body);

        eventEmitter.on("User Registered", sendMail);

        eventEmitter.emit("User Registered", {
            from:"harshalghutlule@gmail.com",
            to:user.Email,
            user:user,
        })

        const token = createToken(user);

        return res.status(201).send({user,token});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

const login = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({Email:req.body.Email});

        if(!user) return res.status(400).send({message:"Please try with another email or password"});

        let match = user.comparePassword(req.body.Password);

        if(!match) return res.status(400).send({message:"Please try with another email or password"});

        const token = createToken(user);

        return res.status(200).send({user,token});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

const reset = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({Email:req.body.Email});

        if(!user) return res.status(400).send({message:"Please try with another email or password"});

        let match = user.comparePassword(req.body.Password);

        if(!match) return res.status(400).send({message:"Please try with another email or password"});

        const token = createToken(user);

        return res.status(200).send({user,token});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

module.exports = {register,login};