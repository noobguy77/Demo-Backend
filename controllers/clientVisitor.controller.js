const ClientVisitor = require("../models/clientVisitor.model.js")
const { v4: uuidv4 } = require('uuid');

exports.create = (req,res) => {

    const client = new ClientVisitor({
        reqID : uuidv4(),
        clientName : req.body.clientName,
        clientOrganization : req.body.clientOrganization,
        clientPhone : req.body.clientPhone,
        clientPhoto : req.body.clientPhoto,
        purposeOfVisit : req.body.purposeOfVisit,
        escortEmpID : req.body.escortEmpID,
        accessStartDay : req.body.accessStartDay,
        accessEndDay : req.body.accessEndDay,
        otpStatus : false,
        escStatus : false
    })

    client
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
    ClientVisitor.find({})
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
    ClientVisitor.findOne({reqID : req.params.reqID})
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
    ClientVisitor.deleteOne({reqID : req.params.reqID})
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
            err.message || "Some error occurred while deleting clientVisitor with id" + req.body.reqID,
        });
    })
}

exports.deleteAll =(req, res) => {
    ClientVisitor.deleteMany({})
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
            err.message || "Some error occurred while deleting clientVisitor with id" + req.body.reqID,
        });
    })
};

