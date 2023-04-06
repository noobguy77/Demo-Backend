const Escort = require("../models/escort.model.js");
const { v4: uuidv4 } = require('uuid');

exports.create = (req,res) => {

    const escort = new Escort({
        escortName : req.body.escortName,
        escortID : req.body.escortID,
        accessAreas : req.body.accessAreas,
        escortPassword : req.body.escortPassword,
        empIDs : req.body.empIDs,
    })

    escort
    .save()
    .then((data) => {
        res.status(200).send({
            success : true,
            data : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            success: false,
            message:
            err.message || "Some error occurred while creating the Escort.",
        });
    });
}

exports.findAll = (req,res) => {
    Escort.find({})
    .then((data) => {
        res.status(200).send({
            success : true,
            data : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            success: false,
            message:
            err.message || "Some error occurred while fetching all Escorts.",
        });
    });
}

exports.findOne = (req, res) => {
    Escort.findOne({reqID : req.params.reqID})
    .then((data) => {
        res.status(200).send({
            success : true,
            data : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            success: false,
            message:
            err.message || "Some error occurred while finding one Escort with id"+ req.params.reqID,
        });
    });
}

exports.delete =(req,res) => {
    Escort.delete({reqID : req.params.reqID})
    .then((data) => {
        res.status(200).send({
            success : true,
            message : "DELETED!"
        })
    })
    .catch((err) => {
        res.status(500).send({
            success: false,
            message:
            err.message || "Some error occurred while deleting Escort with id" + req.body.reqID,
        });
    })
}