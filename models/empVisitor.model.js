const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var empVisitorSchema = new Schema({
    empName : String,
    escortID : String,
    accessTime : String,
    accessAreas : Array
});

module.exports = mongoose.model("EmpVisitor", empVisitorSchema);