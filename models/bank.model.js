const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bankSchema = new Schema({
    reqID : String,
    name : String,
    age : String,
    gender : String,
    bloodGroup : String,
    phoneNumber : String,
    escortEmpID : String,
    slotDate : String,
    slotTime : String,
    hospital : String,
    type : Boolean,
    otpStatus : Boolean,
});

module.exports = mongoose.model("Bank", bankSchema);