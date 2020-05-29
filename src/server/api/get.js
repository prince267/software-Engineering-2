const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {
  if (
    Object.keys(req.query)[0] != "id" &&
    Object.keys(req.query)[0] != "Department"
  ) {
    res.status(400).send({ error: "bad request" });
  }

  const id = req.query.id;
  const Department = req.query.Department;
  console.log("Department", Department)
  if (id === undefined && Department === undefined) {
    res.status(400);
    res.json({ error: "pass the parameter either id or Department" });
    res.send();
  }

  if (Department === undefined) {
    connection.query(
      "SELECT * FROM CollegeDetail WHERE Id =" + id,
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: "bad request" });
        } else {
          console.log(">>> get call...");
          if (result[0] === undefined) {
            res.json({ response: `College of id : ${id} is not present` });
          } else {
            res.json(result);
          }
        }
      }
    );
  }

  if (id === undefined) {
    console.log("enter*****")
    connection.query(
      `select 
      CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
      from CollegeDetail, Courses, Address where CourseId=Courses.id and AddressId=Address.id and Department="${Department}";`,
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          console.log(">>> get call...");
          if (result[0] === undefined) {
            res.json({ response: `College of Department : ${Department} is not present` });
          } else {
            res.json(result);
          }
        }
      }
    );
  }
});

module.exports = router;
