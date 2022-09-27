const jwt = require("jsonwebtoken");
const db = require("../database");
const User = db.users;

const utils = require("../utils");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (utils.getStringWithNormalSpaces(name).length < 4) {
      return res
        .status(400)
        .json({ error: "Name length should be 4 or greater" });
    }
    if (utils.getStringWithNormalSpaces(username).length < 6) {
      return res
        .status(400)
        .json({ error: "Username length should be 6 or greater" });
    }
    if (utils.getStringWithNormalSpaces(password).length < 6) {
      return res
        .status(400)
        .json({ error: "Password length should be 6 or greater" });
    }

    const candidate = await User.findOne({ where: { username } });

    if (!!candidate) {
      return res
        .status(400)
        .json({ error: "User with this username already exist" });
    }

    const user = await User.create({
      name,
      username,
      password,
    });

    const token = await jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this username doest exist" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = await jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const { id } = req.decoded;
    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with ID=${id} doesn't exist` });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.decoded;
    const { name, username, password } = req.body;

    if (!name && !username && !password) {
      return res
        .status(400)
        .json({ error: "Trying to update with empty data" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with ID=${id} doesn't exist` });
    }

    await user.update({ name, username, password });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.decoded;

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with ID=${id} doesn't exist` });
    }

    await user.destroy();

    return res.status(204).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
