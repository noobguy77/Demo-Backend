module.exports = (app) => {
    const twilio = require("../controllers/twillio.controller");

    app.get("/sendOTP/:clientPhone",twillio.sendOTP);

    app.post("/verifyOTP/:clientPhone/:reqID",twillio.verifyOTP);

}