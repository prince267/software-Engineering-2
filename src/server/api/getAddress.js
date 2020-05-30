const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {

  if (
    Object.keys(req.query)[0] != "type" 
  ) {
    res.status(400).send({ error: "bad request" });
  }

  const type = req.query.type;
  if (type === undefined ) {
    res.status(400);
    res.json({ error: "pass the parameter either City or State" });
    res.send();
  }

  if (type === "city") {
    connection.query(
      "select distinct(city) from Address",
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: "bad request" });
        } else {
          console.log(">>> get call...");
          if (result[0] === undefined) {
            res.json({ response: `College of City : ${City} is not present` });
          } else {
            res.json(result);
          }
        }
      }
    );
  }

 else if (type === "state") {
    connection.query(
     "select distinct(state) from Address",
        (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          console.log(">>> get call...");
          if (result[0] === undefined) {
            res.json({ response: `College of State : ${State} is not present` });
          } else {
            res.json(result);
          }
        }
      }
    );
  }
  else{
    res.status(400).send({ error: "bad request" }); 
  }
});

module.exports = router;
