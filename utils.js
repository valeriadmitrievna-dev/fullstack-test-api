const bcrypt = require("bcrypt");

module.exports = {
  getStringWithNormalSpaces(value) {
    return value.replace(/ +(?= )/g, "").trim();
  },
  async hash(text, size) {
    try {
      const salt = await bcrypt.genSalt(size);
      const hash = await bcrypt.hash(text, salt);

      return hash;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
