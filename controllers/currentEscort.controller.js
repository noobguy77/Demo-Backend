const CurrentEscort = require("../models/currentEscort.model.js");

exports.create = (req,res) => {
    const currentEscort = new CurrentEscort({
        id : 1,
        currentEscID : req.body.currentEscID,
    })
    currentEscort.save()
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
            err.message || "Some error occurred while creating the CurrentEscort.",
        });
    });
}

exports.update = (req, res) => {
    CurrentEscort.findOneAndUpdate(
        {id : 1},
        {
            $set : {
                currentEscID : req.body.currentEscID,
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
            err.message || "Some error occurred while updating the CurrentEscort.",
        });
    });
}