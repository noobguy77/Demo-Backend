const Escort = require("../models/escort.model.js");
const ClientVisitor = require("../models/clientVisitor.model.js");
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

exports.escortLogin = (req, res) => {
    Escort.findOne({ escortID: req.body.escortID })
        .then((escort) => {
            if (!escort) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

            if (escort.escortPassword === req.body.escortPassword) {
                return res.status(200).send({
                    success: true,
                    message: 'Logged in successfully',
                });
            } else {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid credentials',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message || 'Some error occurred while logging in Escort',
            });
        });
};

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
    Escort.findOne({escortID : req.params.escortID})
    .then((data) => {
        data = data[0];
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
    Escort.deleteOne({escortID : req.params.escortID})
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
            err.message || "Some error occurred while deleting Escort with id" + req.body.escortID,
        });
    })
}

exports.deleteAll =(req,res) => {
    Escort.deleteMany({})
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
            err.message || "Some error occurred while deleting escorts",
        });
    })
};

exports.visitRequests = (req,res) => {
    ClientVisitor.find({escortEmpID : req.params.escortID})
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
            err.message || "Some error occurred while finding requests associated with escortID " + req.params.escortID,
        });
    });
}

exports.validateRequest = (req,res) => {
    const reqID = req.params.reqID;
    ClientVisitor.findOneAndUpdate(
        {reqID: req.params.reqID},
        {
            $set : {
                escStatus : true,
            }
        },
        {upsert : true},
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
            err.message || "Some error occurred while updating the escStatus with reqID ."+req.params.reqID,
        });
    });
}

exports.setAccessAreas = (req,res) => {
    const reqID = req.params.reqID;
    const setAccessAreas = req.body.accessAreas;
    ClientVisitor.findOneAndUpdate(
        {reqID: req.params.reqID},
        {
            $set : {
                accessAreas : setAccessAreas,
            }
        },
        {upsert : true}
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
            err.message || "Some error occurred while updating the accessAreas with reqID ."+req.params.reqID,
        });
    });
}