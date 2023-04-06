const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var securitySchema = new Schema({
    secID : String,
    secPass : String,
    secName : String,
})

module.exports = mongoose.model("Security", securitySchema);