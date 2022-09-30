const { Sequelize, Model, DataTypes } = require("sequelize");

const hostName = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const dialect = process.env.DB_DIALECT;
const URI = process.env.DATABASE_URL;
const options =
  process.env.ENV === "development" ? [database, username, password] : [URI];

const sequelize = new Sequelize(...options, {
  host: hostName,
  dialect: dialect,
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 20000,
    idle: 5000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./models/user.model")(sequelize, Sequelize);
db.tasks = require("./models/task.model")(sequelize, Sequelize);

db.users.hasMany(db.tasks, { onDelete: "CASCADE" });
db.tasks.belongsTo(db.users);

module.exports = db;
