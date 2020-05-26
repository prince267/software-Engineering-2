const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {
  if (
    Object.keys(req.query)[0] != "id" &&
    Object.keys(req.query)[0] != "name"
  ) {
    res.status(400).send({ error: "bad request" });
  }

  const id = req.query.id;
  const name = req.query.name;

  if (id === undefined && name === undefined) {
    res.status(400);
    res.json({ error: "pass the parameter either id or name" });
    res.send();
  }

  if (name === undefined) {
    connection.query(
      "SELECT * FROM users WHERE user_id =" + id,
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: "bad request" });
        } else {
          console.log(">>> get call...");
          if (result[0] === undefined) {
            res.json({ response: `user of id : ${id} is not present` });
          } else {
            res.json(result);
          }
        }
      }
    );
  }

  if (id === undefined) {
    connection.query(
      "SELECT * FROM users WHERE first_name =" + name,
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: "bad request" });
        } else {
          console.log(">>> get call...");
          if (result[0] === undefined) {
            res.json({ response: `user of name : ${name} is not present` });
          } else {
            res.json(result[0]);
          }
        }
      }
    );
  }
});

module.exports = router;
