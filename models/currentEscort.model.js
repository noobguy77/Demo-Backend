const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var currentEscortSchema = new Schema({
    id : Number,
    currentEscID : String,
})

module.exports = mongoose.model("CurrentEscort", currentEscortSchema);