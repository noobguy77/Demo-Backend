const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const ClientVisitor = require("../models/clientVisitor.model.js");


exports.sendOTP = async (req, res) => {
    const countryCode = "91";
    const phoneNumber = req.params.clientPhone;
    client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
    })
    .then((data) => {
        res.status(200).send({
            success: true,
            message: "OTP sent!",
        });
    })
    .catch((err) => {
        res.status(400).send({
            error: err,
            message: err.message || "OTP failed to send",
        });
    });
};

exports.verifyOTP = (req, res) => {
    const countryCode = "91";
    const phoneNumber = req.params.clientPhone;
    const otp = req.body.otp;
    client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
    })
    .then((resp) => {
        if (resp.valid) {
          console.log("OTP VERIFICATION SUCCESS");
          client.messages
          .create({
            body:
              "Hello " +
              req.body.clientName +
              " your visitor pass for Tata Consultancy Services has been allocated click on the below link to download the pass http://visiteur.com/" +
              req.params.reqID,
            from: "+15076046828",
            to: `+${countryCode}${phoneNumber}`,
          })
          .then((message) => {
            ClientVisitor.findOneAndUpdate(
              {reqID: req.params.reqID},
              {
                $set : {
                  otpStatus: true,
                }
              }
            )
            .then((data) => {
              res.status(200).send({
                success : true,
                data : message,
              })
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Error While sending pass message 1",
                error : true,
              })
            })
          })
          .catch((err) => {
            res.status(400).send({
              message: err.message || "Error While sending pass message",
              error : true,
            });
          })
        } else {
            res.status(400).send({
                error: true,
            });
        }
    })
    .catch((err) => {
        res.status(400).send({
        message: " OTP Verification Failed!",
      });
    });
};

