const person = require("../models").person;

module.exports = {
  create(req, res) {
    return person
      .create({
        url: req.body.url,
        insult: req.body.insult
      })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  }
};
