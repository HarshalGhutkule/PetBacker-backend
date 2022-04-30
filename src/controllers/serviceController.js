const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Service = require("../models/ServiceModel");
const serviceController = require("./crudController");

const router = express.Router();

router.get("", async(req,res)=>{
    try{
        if(req.query.page === undefined){
            const service = await Service.find().lean().exec();

            return res.status(200).send(service);
        }
        else if(req.query.page != undefined && req.query.sort != undefined){
            const page = req.query.page || 1;
            const size = req.query.size || 5;
            const service = await Service.find().sort({Cost:req.query.sort}).skip((page-1)*size).limit(size).lean().exec();

            const totalPages  = Math.ceil((await Service.find().countDocuments())/size);
            return res.status(200).send({service,totalPages});

        }
        const page = req.query.page || 1;
        const size = req.query.size || 5;
        const service = await Service.find().skip((page-1)*size).limit(size).lean().exec();

        const totalPages  = Math.ceil((await Service.find().countDocuments())/size);

        return res.status(200).send({service,totalPages});
    }
    catch(err){
        return res.status(500).send(err.message);
    }
});

router.post("", authenticate, async(req,res)=>{
    try{
        const user_id = req.user._id;
        const service = await Service.create({
            Url:req.body.Url,
            Name:req.body.Name,
            City:req.body.City,
            Address:req.body.Address,
            Cost:req.body.Cost,
            Verified:req.body.Verified,
            Rating:req.body.Rating,
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

router.get("/city/:city", async (req, res) => {
    try {
      const service = await Service.find({City:{$regex:`^${req.params.city}`}}).lean().exec();
      return res.status(200).send(service);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

router.patch("/:id",authenticate, async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, {
        Url:req.body.Url,
        Name:req.body.Name,
        City:req.body.City,
        Address:req.body.Address,
        Cost:req.body.Cost,
        Verified:req.body.Verified,
        Rating:req.body.Rating,
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
    }, {
        new: true,
      });
      return res.status(200).send(service);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

router.delete("/:id", authenticate, serviceController(Service).delete);

module.exports = router;