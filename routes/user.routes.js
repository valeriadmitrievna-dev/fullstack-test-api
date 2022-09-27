const withAuth = require("../middlewares/auth");

module.exports = (app) => {
  const users = require("../controllers/user.controller");

  var router = require("express").Router();
  router.get("/", users.getAll);
  router.get("/data", withAuth, users.getUserData);
  router.post("/signup", users.signup);
  router.post("/signin", users.signin);
  router.put("/", withAuth, users.update);
  router.delete("/", withAuth, users.delete);

  app.use("/api/users", router);
};
