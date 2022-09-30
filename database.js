const { Sequelize } = require("sequelize");

const URL = process.env.DATABASE_URL;

const sequelize = new Sequelize(URL, {
  dialect: "postgres",
  ssl: false,
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
