module.exports = (app) => {
    const escortController = require("../controllers/escort.controller.js");

    app.post("/escort",escortController.create);

    app.get("/escorts",escortController.findAll);

    app.get("escort/:reqID",escortController.findOne);

    app.get("validateRequest/:reqID",escortController.findOne);

    app.delete("/escort/:reqID",escortController.delete);

    app.delete("/escorts",escortController.deleteAll);
}