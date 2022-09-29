module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    deadline: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  return Task;
};
