module.exports = (app) => {
    const clientController = require("../controllers/clientVisitor.controller.js");

    app.post("/clientVisitor",clientController.create);

    app.get("/clientVisitors",clientController.findAll);

    app.get("/clientVisitor/:reqID",clientController.findOne);

    app.delete("/clientVisitor/:reqID",clientController.delete);

    app.delete("/clientVisitors",clientController.deleteAll);
}