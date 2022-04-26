const express = require("express");
const authenticate = require("../middlewares/authenticate");
const User = require("../models/UserModel");
const userController = require("./crudController");

const router = express.Router();

router.get("", authenticate, userController(User).get);

router.post("", authenticate, userController(User).post);

router.get("/:id", authenticate, userController(User).getOne);

router.patch("/:id", authenticate, async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,{
            FirstName : req.body.FirstName,
            LastName : req.body.LastName,
            Email:req.body.Email,
        },{new:true});
        return res.status(200).send(user);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
})

router.delete("/:id",authenticate, userController(User).delete);

module.exports = router;