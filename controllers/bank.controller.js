const Bank = require("../models/bank.model.js")
const { v4: uuidv4 } = require('uuid');

exports.create = (req,res) => {

    const bank = new Bank({
        reqID : uuidv4(),
        name : req.body.name,
        age : req.body.age,
        gender : req.body.gender,
        bloodGroup : req.body.bloodGroup,
        phoneNumber : req.body.phoneNumber,
        escortEmpID : req.body.escortEmpID,
        slotDate : req.body.slotDate,
        slotTime : req.body.slotTime,
        hospital : req.body.hospital,
        otpStatus : false,
        type : req.body.type,
    })

    bank
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
            err.message || "Some error occurred while creating the Contest.",
        });
    });
}

exports.findAll = (req,res) => {
    Bank.find({})
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
            err.message || "Some error occurred while creating the Contest.",
        });
    });
}

exports.findOne = (req, res) => {
    Bank.findOne({reqID : req.params.reqID})
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
            err.message || "Some error occurred while creating the Contest.",
        });
    });
}

exports.delete =(req,res) => {
    Bank.deleteOne({reqID : req.params.reqID})
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
            err.message || "Some error occurred while deleting Bank with id" + req.body.reqID,
        });
    })
}

exports.deleteAll =(req, res) => {
    Bank.deleteMany({})
    .then((data) => {
        res.status(200).send({
            success : true,
            message : "DELETED ALL!"
        })
    })
    .catch((err) => {
        res.status(500).send({
            success: false,
            message:
            err.message || "Some error occurred while deleting Bank with id" + req.body.reqID,
        });
    })
};

