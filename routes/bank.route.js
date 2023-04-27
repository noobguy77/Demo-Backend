module.exports = (app) => {
    const bankController = require("../controllers/bank.controller.js");

    app.post("/bank",bankController.create);

    app.get("/banks",bankController.findAll);

    app.get("/bank/:reqID",bankController.findOne);

    app.delete("/bank/:reqID",bankController.delete);

    app.delete("/banks",bankController.deleteAll);
}