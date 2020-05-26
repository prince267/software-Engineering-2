const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

// update
router.put("/", (req, res) => {
  if (Object.keys(req.query)[0] != "id") {
    res.status(400).send({ error: "bad request" });
    return;
  }

  if (
    req.query.id === undefined ||
    req.query.id == "" ||
    req.query.id == null
  ) {
    res.status(400);
    res.json({ error: "Pass the 'id' parameter in URL..." });
    res.send();
    return;
  }

  connection.query(
    "SELECT * FROM user_detail WHERE id =" + req.query.id,
    (err, result, fields) => {
      if (err) {
        res.status(400).send({ error: "bad request" });
        return;
      } else {
        console.log(">>> put call...");
        if (result[0] === undefined) {
          res.json({ response: `user of id : ${req.query.id} is not present` });
          return;
        }

        connection.query(
          "UPDATE user_detail SET ? WHERE id = " + String(req.query.id),
          [req.body],
          (err, result, fields) => {
            if (err) console.log(err);
            console.log(">>> put method call...");
            res.json({ result: "Record updated..." });
          }
        );
      }
    }
  );

  // const temp = "UPDATE user_detail SET ? WHERE id = " + String(req.query.id);
  // connection.query(temp, [req.body], (err, result, fields) => {
  //   if (err) console.log(err);
  //   console.log(">>> put method call...");
  //   res.json({ result: "Record updated..." });
  // });
});

module.exports = router;
