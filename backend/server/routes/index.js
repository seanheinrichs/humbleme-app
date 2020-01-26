const presonController = require("../controllers").person;

module.export = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Nothing to see"
    })
  );
  app.post("/api/person", presonController.create);
};
