const withAuth = require("../middlewares/auth");

module.exports = (app) => {
  const tasks = require("../controllers/task.controller");

  const router = require("express").Router();
  router.get("/", withAuth, tasks.getAll);
  router.get("/:id", withAuth, tasks.getTask);
  router.post("/", withAuth, tasks.create);
  router.put("/:id", withAuth, tasks.update);
  router.delete("/:id", withAuth, tasks.delete);

  app.use("/api/tasks", router);
};
