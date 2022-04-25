const User = require("../models/UserModel")
var jwt = require('jsonwebtoken');

const createToken = (user)=>{
    return jwt.sign({user}, 'shhhhh');
}

const register = async(req,res)=>{

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

    try{
        let user = await User.findOne({Email:req.body.Email}).lean().exec();

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