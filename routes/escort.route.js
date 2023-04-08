module.exports = (app) => {
    const escortController = require("../controllers/escort.controller.js");

    app.post("/escort",escortController.create);

    app.get("/escorts",escortController.findAll);

    app.get("/escort/:escortID",escortController.findOne);

    app.get("/visitRequests/:escortID",escortController.visitRequests);

    app.get("/validateRequest/:reqID",escortController.validateRequest);

    app.post("/setAccessAreas/:reqID",escortController.setAccessAreas);

    app.delete("/escort/:escortID",escortController.delete);

    app.delete("/escorts",escortController.deleteAll);

    app.post("/escortLogin",escortController.escortLogin);
}