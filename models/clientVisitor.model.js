const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var clientVisitorSchema = new Schema({
    reqID : String,
    clientName : String,
    clientOrganization : String,
    purposeOfVisit : String,
    escortEmpID : String,
    accessTime : String,
});

module.exports = mongoose.model("ClientVisitor", clientVisitorSchema);