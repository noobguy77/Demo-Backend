const EmpVisitor = require("../models/empVisitor.model.js");
const { v4: uuidv4 } = require('uuid');

exports.create = (req,res) => {

    const emp = new EmpVisitor({
        reqID : uuidv4(),
        empName : req.body.empName,
        empID : req.body.empID,
        escortID : req.body.escortID,
        accessTime : req.body.accessTime,
        accessAreas : req.body.accessAreas
    })

    emp
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
            err.message || "Some error occurred while creating the empVisitor.",
        });
    });
}

exports.findAll = (req,res) => {
    EmpVisitor.find({})
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
            err.message || "Some error occurred while fetching all empVisitors.",
        });
    });
}

exports.findOne = (req, res) => {
    EmpVisitor.findOne({reqID : req.params.reqID})
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
            err.message || "Some error occurred while finding one empVisitor with id"+ req.params.reqID,
        });
    });
}
exports.setNumber = (req,res) => {
    EmpVisitor.findOneAndUpdate(
        {empID : req.body.empID},
        {
            $set : {
                empNumber : req.body.empNumber,
            },
        }
    )
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
            err.message || "Some error occurred while updating the empVisitorNumber.",
        });
    });
}
exports.delete =(req,res) => {
    EmpVisitor.delete({reqID : req.params.reqID})
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
            err.message || "Some error occurred while deleting EmpVisitor with id" + req.body.reqID,
        });
    })
}