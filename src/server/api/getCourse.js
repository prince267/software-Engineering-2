const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {
  if (Object.keys(req.query)[0] != "department") {
    res.status(400).send({ error: "bad request" });
  }

  const department = req.query.department;
  if (department === undefined) {
    res.status(400);
    res.json({ error: "pass the parameter either City or State" });
    res.send();
  }
  connection.query(
    `select id, CourseName from Courses where Department="${department}"`,
    (err, result, fields) => {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        if (result[0] === undefined) {
          res.json({ response: `${department} is not present` });
        } else {
          res.json(result);
        }
      }
    }
  );
});

module.exports = router;
