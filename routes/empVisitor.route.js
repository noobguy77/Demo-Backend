module.exports = (app) => {
    const empController = require("../controllers/empVisitor.controller.js");

    app.post("/empVisitor",empController.create);

    app.get("/empVisitors",empController.findAll);

    app.get("empVisitor/:reqID",empController.findOne);

    app.delete("/empVisitor/:reqID",empController.delete);
}