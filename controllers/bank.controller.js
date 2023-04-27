const Bank = require("../models/bank.model.js");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID_1, TWILIO_AUTH_TOKEN_1, TWILIO_SERVICE_SID_1 } = process.env;
const client1 = require("twilio")(TWILIO_ACCOUNT_SID_1, TWILIO_AUTH_TOKEN_1);
const { v4: uuidv4 } = require('uuid');

exports.create = (req, res) => {

    const bank = new Bank({
        reqID: uuidv4(),
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        bloodGroup: req.body.bloodGroup,
        phoneNumber: req.body.phoneNumber,
        escortEmpID: req.body.escortEmpID,
        slotDate: req.body.slotDate,
        slotTime: req.body.slotTime,
        hospital: req.body.hospital,
        otpStatus: false,
        type: req.body.type,
    })
    bank
        .save()
        .then((data) => {
            const countryCode = "91";
            const phoneNumber = req.body.phoneNumber;
            if (req.body.type) {
                const countryCode = "91";
                const phoneNumber = req.body.phoneNumber;
                client1.messages
                    .create({
                        body:
                            "Hello Donor " +
                            data.name +
                            " your slot has been allocated on " + data.slotDate + " at " + data.slotTime + ". Please visit your respective hospital - " + data.hospital,
                        from: "+16076382242",
                        to: `+${countryCode}${phoneNumber}`,
                    })
                    .then((message) => {
                        res.status(200).send({
                            message: message,
                            success: true,
                        });
                    })
                    .catch((err) => {
                        res.status(400).send({
                            message: err.message || "Error While sending pass message",
                            error: true,
                        });
                    })
            } else {
                client1.messages
                    .create({
                        body:
                            "Hello Receiver " +
                            data.name +
                            " your slot has been allocated on " + data.slotDate + " at " + data.slotTime + ". Please visit your respective hospital - " + data.hospital,
                        from: "+16076382242",
                        to: `+${countryCode}${phoneNumber}`,
                    })
                    .then((message) => {
                        res.status(200).send({
                            message: message,
                            success: true,
                        });
                    })
                    .catch((err) => {
                        res.status(400).send({
                            message: err.message || "Error While sending pass message",
                            error: true,
                        });
                    })
            }
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message:
                    err.message || "Some error occurred while creating the Contest.",
            });
        });
}

exports.findAll = (req, res) => {
    Bank.find({})
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
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
    Bank.findOne({ reqID: req.params.reqID })
        .then((data) => {
            res.status(200).send({
                success: true,
                data: data
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

exports.delete = (req, res) => {
    Bank.deleteOne({ reqID: req.params.reqID })
        .then((data) => {
            res.status(200).send({
                success: true,
                message: "DELETED!"
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

exports.deleteAll = (req, res) => {
    Bank.deleteMany({})
        .then((data) => {
            res.status(200).send({
                success: true,
                message: "DELETED ALL!"
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

