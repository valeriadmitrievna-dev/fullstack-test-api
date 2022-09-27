const db = require("../database");
const User = db.users;
const Task = db.tasks;

const utils = require("../utils");

exports.create = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (utils.getStringWithNormalSpaces(title).length < 4) {
      return res
        .status(400)
        .json({ error: "Title length should be 4 or greater" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = await Task.create({
      title,
      description,
      userId: user.id,
    });

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ error: `Task with ID=${id} doesn't exist` });
    }
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, done } = req.body;

    if (!title && !description && !done) {
      return res
        .status(400)
        .json({ error: "Trying to update with empty data" });
    }

    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ error: `Task with ID=${id} doesn't exist` });
    }

    await task.update({ title, description, done });

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res
        .status(404)
        .json({ error: `Task with ID=${id} doesn't exist` });
    }

    await task.destroy();

    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
