const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Petdetail = require("../models/PetDetailModel");
const petDetailController = require("./crudController");

const router = express.Router();

router.get("", authenticate, async(req,res)=>{
    try{
        const petdetail = await Petdetail.find().populate({path:"user_id",select:["FirstName"]}).lean().exec();
        return res.status(200).send(petdetail);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});

router.post("", authenticate, async(req,res)=>{
    try{
        const user_id = req.user._id;
        const petdetail = await Petdetail.create({
            name:req.body.name,
            cost:req.body.cost,
            onboard:req.body.onboard,
            typeOfPet:req.body.typeOfPet,
            breed:req.body.breed,
            sizeOfPet:req.body.sizeOfPet,
            date:req.body.date,
            time:req.body.time,
            numberOfNights:req.body.numberOfNights,
            address: req.body.address,
            pickup: req.body.pickup,
            user_id: user_id,
        });
        return res.status(201).send(petdetail);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.get("/:id",authenticate, async (req, res) => {

    try {
      const petdetail = await Petdetail.find({user_id:{$eq:[req.params.id]}}).lean().exec();
      return res.status(200).send(petdetail);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

router.patch("/:id",authenticate, async (req, res) => {
    try {
      const petdetail = await Petdetail.findByIdAndUpdate(req.params.id, {
        status:req.body.status
      }, {
        new: true,
      });
      return res.status(200).send(petdetail);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

router.delete("/:id", authenticate, petDetailController(Petdetail).delete);

module.exports = router;