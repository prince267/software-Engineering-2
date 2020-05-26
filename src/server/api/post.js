const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

// post method
router.post("/", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const department = req.body.department;
  const subject = req.body.subject;

  if (
    name == undefined ||
    age == undefined ||
    department == undefined ||
    subject == undefined
  ) {
    res.status(400).send({ error: "parameter missing. Try again..." });
    return;
  }

  connection.query(
    "INSERT INTO user_detail SET ?",
    [req.body],
    (err, result, fields) => {
      if (err) console.log(err);
      console.log(">>> post method call...");
      res.json({ result: "Record created..." });
    }
  );
});

module.exports = router;
