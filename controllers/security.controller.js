const Security = require("../models/security.model.js");
const { v4: uuidv4 } = require('uuid');

exports.create = (req,res) => {

    const sec = new Security({
        secID : req.body.secID,
        secPass : req.body.secPass,
        secName : req.body.secName,
    })

    sec
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
            err.message || "Some error occurred while creating the Security.",
        });
    });
}

exports.findAll = (req,res) => {
    Security.find({})
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
            err.message || "Some error occurred while fetching all Security.",
        });
    });
}

exports.findOne = (req, res) => {
    Security.findOne({reqID : req.params.reqID})
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
            err.message || "Some error occurred while finding one Security with id"+ req.params.reqID,
        });
    });
}

exports.delete =(req,res) => {
    Security.delete({reqID : req.params.reqID})
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
            err.message || "Some error occurred while deleting Security with id" + req.body.reqID,
        });
    })
}