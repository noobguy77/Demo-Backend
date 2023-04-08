module.exports = (app) => {
    const twilio = require("../controllers/twilio.controller");

    app.get("/sendOTP/:clientPhone",twilio.sendOTP);

    app.post("/verifyOTP/:clientPhone/:reqID",twilio.verifyOTP);

}