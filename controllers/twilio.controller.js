const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID_1, TWILIO_AUTH_TOKEN_1, TWILIO_SERVICE_SID_1 } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const client1 = require("twilio")(TWILIO_ACCOUNT_SID_1, TWILIO_AUTH_TOKEN_1);

const ClientVisitor = require("../models/clientVisitor.model.js");
const Bank = require("../models/bank.model.js");


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


exports.sendOTPBloodBank = async (req, res) => {
  const countryCode = "91";
  const phoneNumber = req.params.phoneNumber;
  client1.verify.v2
    .services(TWILIO_SERVICE_SID_1)
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
        ClientVisitor.findOne({clientPhone : req.params.clientPhone})
        .then((data) => {
          client.messages
            .create({
              body:
                "Hello " +
                data.clientName +
                " your Visitor Pass has been allocated click on the below link to download the pass http://65.2.82.118:5000/visitorPass/" +
                data.reqID,
              from: "+15076046828",
              to: `+${countryCode}${phoneNumber}`,
            })
            .then((message) => {
              ClientVisitor.findOneAndUpdate(
                { reqID: req.params.reqID },
                {
                  $set: {
                    otpStatus: true,
                  }
                }
              )
                .then((data) => {
                  res.status(200).send({
                    success: true,
                    data: message,
                  })
                })
                .catch((err) => {
                  res.status(500).send({
                    message: err.message || "Error While sending pass message 1",
                    error: true,
                  })
                })
            })
            .catch((err) => {
              res.status(400).send({
                message: err.message || "Error While sending pass message",
                error: true,
              });
            })
        })
        .catch((err) => {
          res.status(400).send({
            message: " FEtching Clients After OTP FAILED",
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

exports.verifyOTPBloodBank = (req, res) => {
  const countryCode = "91";
  const phoneNumber = req.params.phoneNumber;
  const otp = req.body.otp;
  client1.verify.v2
    .services(TWILIO_SERVICE_SID_1)
    .verificationChecks.create({
      to: `+${countryCode}${phoneNumber}`,
      code: otp,
    })
    .then((resp) => {
      if (resp.valid) {
        console.log("OTP VERIFICATION SUCCESS");
        Bank.findOneAndUpdate(
          { phoneNumber: req.params.phoneNumber },
          {
            $set: {
              otpStatus: true,
            }
          }
        )
          .then((data) => {
            if(data.type) {
              client1.messages
                .create({
                  body:
                    "Hello Donor " +
                    data.name +
                    " your slot has been allocated on "+data.slotDate+" at "+data.slotTime+". Please visit your respective hospital - "+data.hospital,
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
                    " your slot has been allocated on "+data.slotDate+" at "+data.slotTime+". Please visit your respective hospital - "+data.hospital,
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

