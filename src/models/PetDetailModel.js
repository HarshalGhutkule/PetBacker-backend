const mongoose = require("mongoose");

const PetDetailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true, positive: true },
    onboard: { type: String, required: true },
    typeOfPet: { type: String, required: true },
    breed: { type: String, required: true },
    sizeOfPet: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    numberOfNights: { type: Number, required: true, positive: true },
    address: { type: String, required: true },
    pickup: { type: String, required: true },
    status:{ type: String, default:false },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Petdetail = mongoose.model("petdetail", PetDetailSchema);

module.exports = Petdetail;
