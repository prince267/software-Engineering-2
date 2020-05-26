const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

// delete method
router.delete("/", (req, res) => {
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
        console.log(">>> delete call...");
        if (result[0] === undefined) {
          res.json({ response: `user of id : ${req.query.id} is not present` });
          return;
        }

        connection.query(
          "DELETE FROM user_detail WHERE id =" + String(req.query.id),
          (err, result, fields) => {
            if (err) console.log(err);
            console.log(">>> delete method call...");
            res.json({ result: "Record deleted...." });
          }
        );
      }
    }
  );

  // const temp = "DELETE FROM user_detail WHERE id =" + String(req.params.id);
  // connection.query(temp, (err, result, fields) => {
  //   if (err) console.log(err);
  //   console.log(">>> put method call...");
  //   res.json({ result: "Record deleted...." });
  // });
});

module.exports = router;
