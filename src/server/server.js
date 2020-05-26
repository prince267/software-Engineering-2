const express = require("express");
const cors = require("cors");
const connection = require("./db_connection"); // database connection
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("<h1>Hi There</h1?");
});

app.listen(8080, () => console.log(">>> App is running on port 8080..."));
