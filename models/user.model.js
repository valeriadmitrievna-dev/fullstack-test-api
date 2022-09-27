const bcrypt = require("bcrypt");
const Task = require("./task.model");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue(
          "password",
          bcrypt.hashSync(value, bcrypt.genSaltSync(8), null)
        );
      },
    },
  });

  return User;
};
