const Sequelize = require("sequelize");
const sequelize = new Sequelize("humbleme", "postgres", null, {
  host: "127.0.0.1",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const person = sequelize.define("person", {
  url: Sequelize.STRING,
  insult: Sequelize.STRING
  // image: Sequelize.BLOB
});

module.exports = {
  createPerson(data) {
    sequelize
      .sync()
      .then(() =>
        person.create({
          url: data.url,
          insult: data.insult
          // image: data.image
        })
      )
      .then(newPerson => {
        console.log(newPerson.toJSON());
      });
  },
  listPeople() {
    person.findAll().then(people => {
      console.log(people);
    });
  }
};
