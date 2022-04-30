const User = require("../models/UserModel")
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");
const { sendMail } = require("../config/mail");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const bcrypt = require('bcryptjs');

const createToken = (user)=>{
    return jwt.sign({user}, 'shhhhh');
}

const otpSend = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await User.findOne({Email:req.body.Email}).lean().exec();

        if(user) return res.status(400).send({message:"Please try another mail"});

        let otp = (Math.floor(Math.random() * (9999 - 1000) + 1000).toString());

        eventEmitter.on("User Registered", sendMail);

        eventEmitter.emit("User Registered", {
            from:"harshalghutlule@gmail.com",
            to:req.body.Email,
            user:req.body,
            otp:otp
        })


        return res.status(200).send({otp});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
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
        let user = await User.findById(req.params.id);

        if(!user) return res.status(400).send({message:"Please try with correct password"});

        let match = user.comparePassword(req.body.Password);

        if(!match) return res.status(400).send({message:"Please try with correct password"});

        var hash = bcrypt.hashSync(req.body.ConfirmPassword, 8);

        user = await User.findByIdAndUpdate(
          req.params.id,
          { $set: { Password: hash } },
          {
            new: true,
          }
        );

        const token = createToken(user);

        let status = "ok";

        return res.status(200).send({user,token,status});
    }
    catch(err){
        return res.status(500).send({ message: err.message });
    }
}

module.exports = {register,login,reset,otpSend};