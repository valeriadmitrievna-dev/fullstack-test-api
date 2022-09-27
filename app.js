require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./database");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome" });
});

db.sequelize
  // { force: true } on prod
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./routes/user.routes")(app);
require("./routes/task.routes")(app);

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
