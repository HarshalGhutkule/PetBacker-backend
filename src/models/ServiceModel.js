const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    Url:{type:String, required:true},
    Name:{type:String, required:true},
    City:{type:String, required:true},
    Address:{type:String, required:true},
    Cost:{type:Number, required:true, positive:true},
    Verified:{type:String, required:true},
    Rating:{type:Number, required:true, positive:true},
    Summary: {type:String, required:true},
    NumberOfPets: {type:Number, required:true, positive:true},
    AcceptedPetTypes: [{type:String}],
    AcceptedPetSize: [{type:String}],
    AdultSupervision: {type:String, required:true},
    PlaceWhereLeftUnsupervised: {type:String, required:true},
    PlaceForSleep: {type:String, required:true},
    PottyBreaks: {type:Number, required:true, positive:true},
    WalksPerDay: {type:Number, required:true, positive:true},
    TypeOfHome: {type:String, required:true},
    OutdoorArea: {type:String, required:true},
    EmergencyTransport: {type:String, required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Service = mongoose.model("service", serviceSchema);

module.exports = Service;
