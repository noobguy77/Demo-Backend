const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var clientVisitorSchema = new Schema({
    reqID : String,
    clientName : String,
    clientOrganization : String,
    purposeOfVisit : String,
    escortEmpID : String,
    accessStartDay : String,
    accessEndDay : String,
    accessAreas : Array,
    otpStatus : Boolean,
    escStatus : Boolean
});

module.exports = mongoose.model("ClientVisitor", clientVisitorSchema);