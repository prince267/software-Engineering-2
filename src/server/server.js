const express = require("express");
const cors = require("cors");
const connection = require("./db_connection"); // database connection
const routes = require("./routes");
var morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/", routes);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Server Is Running</h1?");
});

app.listen(8080, () => console.log("Server  is Listening on port 8080..."));
