const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var escortSchema = new Schema({
    escortName : String,
    escortID : String,
    accessAreas : Array,
    escortPassword : String,
    empIDs : Array,
});

module.exports = mongoose.model("Escort", escortSchema);