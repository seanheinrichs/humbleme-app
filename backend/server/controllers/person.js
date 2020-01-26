const person = require("../models").person;

module.exports = {
  create(req, res) {
    return person
      .create({
        aid: req.body.aid,
        insult: req.body.insult
      })
      .then(person => res.status(201).send(person))
      .catch(error => res.status(400).send(error));
  },
  createDirect(data) {
    return person.create({
      aid: data.aid,
      insult: data.insult
    });
  },
  async list() {
    people = await person.findAll({ raw: true });
    console.log(people);
  }
};
