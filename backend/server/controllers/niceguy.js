const niceguy = require("../models").niceguy;

module.exports = {
  create(req, res) {
    return niceguy
      .create({
        aid: req.body.aid,
        compliment: req.body.compliment
      })
      .then(niceguy => res.status(201).send(niceguy))
      .catch(error => res.status(400).send(error));
  },
  createDirect(data) {
    return niceguy.create({
      aid: data.aid,
      compliment: data.compliment
    });
  },
  async fetchCompliment(aid) {
    rawNiceGuy = await niceguy.findAll({ raw: true, where: { aid: aid } });
    if (rawNiceGuy.length) return rawNiceGuy[0].compliment;
  }
};
