const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Service = require("../models/ServiceModel");
const serviceController = require("./crudController");

const router = express.Router();

router.get("", serviceController(Service).get);

router.post("", authenticate, async(req,res)=>{
    try{
        const user_id = req.user._id;
        const service = await Service.create({
            Summary: req.body.Summary,
            NumberOfPets: req.body.NumberOfPets,
            AcceptedPetTypes: req.body.AcceptedPetTypes,
            AcceptedPetSize: req.body.AcceptedPetSize,
            AdultSupervision: req.body.AdultSupervision,
            PlaceWhereLeftUnsupervised: req.body.PlaceWhereLeftUnsupervised,
            PlaceForSleep: req.body.PlaceForSleep,
            PottyBreaks: req.body.PottyBreaks,
            WalksPerDay: req.body.WalksPerDay,
            TypeOfHome: req.body.TypeOfHome,
            OutdoorArea: req.body.OutdoorArea,
            EmergencyTransport: req.body.EmergencyTransport,
            user_id: user_id,
        });
        return res.status(201).send(service);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.get("/:id", serviceController(Service).getOne);

router.patch("/:id", serviceController(Service).patch);

router.delete("/:id", serviceController(Service).delete);

module.exports = router;