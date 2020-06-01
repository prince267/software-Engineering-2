const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {
  if (
    Object.keys(req.query)[0] != "type" &&
    Object.keys(req.query)[0] != "state"
  ) {
    res.status(400).send({ error: "bad request" });
  }

  const type = req.query.type;
  const state = req.query.state;

  if (type === undefined && state === undefined) {
    res.status(400);
    res.json({ error: "pass the parameter either City or State" });
    res.send();
  }
  if (state === undefined) {
    if (type === "city") {
      connection.query(
        "select distinct(city) from Address order by city",
        (err, result, fields) => {
          if (err) {
            res.status(400).send({ error: "bad request" });
          } else {
            if (result[0] === undefined) {
              res.json({
                response: `College of City : ${City} is not present`,
              });
            } else {
              res.json(result);
            }
          }
        }
      );
    }

    if (type === "state") {
      connection.query(
        "select distinct(state) from Address order by state",
        (err, result, fields) => {
          if (err) {
            res.status(400).send({ error: err });
          } else {
            if (result[0] === undefined) {
              res.json({
                response: `College of State : ${State} is not present`,
              });
            } else {
              res.json(result);
            }
          }
        }
      );
    }
  }
  if (type === undefined) {
    connection.query(
      `select city from Address where state="${state}"`,
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          if (result[0] === undefined) {
            res.json({ response: `City of State : ${State} is not present` });
          } else {
            res.json(result);
          }
        }
      }
    );
  }
});

module.exports = router;
