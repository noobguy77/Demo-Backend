module.exports = (app) => {
    const securityController = require("../controllers/security.controller.js");

    app.post("/security",securityController.create);

    app.get("/securities",securityController.findAll);

    app.get("security/:secID",securityController.findOne);

    app.delete("/security/:secID",securityController.delete);
}