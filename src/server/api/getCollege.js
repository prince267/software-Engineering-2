const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {
  if (
    Object.keys(req.query)[0] != "name" &&
    Object.keys(req.query)[0] != "Department"
  ) {
    res.status(400).send({ error: "bad request" });
  }

  const name = req.query.name;
  const Department = req.query.Department;
  if (name === undefined && Department === undefined) {
    res.status(400);
    res.json({ error: "pass the parameter either id or Department" });
    res.send();
  }

  if (Department === undefined) {
    const regex = RegExp('^[%].*[%]$');
    if (regex.test(name)) {
      connection.query(
        `select distinct(CollegeName) from CollegeDetail where CollegeName like '${name}' order by CollegeName limit 20`,
        (err, result, fields) => {
          if (err) {
            res.status(400).send({ error: err });
          } else {
            res.json(result);
          }
        }
      );
    } else {
      connection.query(
        `select CollegeName,Logo,Image1,Image2,Image3,City,State,Address1,Fees,MedianSalary,Rating,Website,Description,Phone,CourseName,Department from CollegeDetail,Courses,Address where CourseId=Courses.id and AddressId=Address.id and CollegeName="${name}";`,
        (err, result, fields) => {
          if (err) {
            res.status(400).send({ error: err });
          } else {
            if (result[0] === undefined) {
              res.json({
                response: `College of name : ${name} is not present`,
              });
            } else {
              res.json(result[0]);
            }
          }
        }
      );
    }
  } else if (name === undefined) {
    connection.query(
      `select 
      CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
      from CollegeDetail, Courses, Address where CourseId=Courses.id and AddressId=Address.id and Department="${Department}";`,
      (err, result, fields) => {
        if (err) {
          res.status(400).send({ error: err });
        } else {
          if (result[0] === undefined) {
            res.json({
              response: `College of Department : ${Department} is not present`,
            });
          } else {
            res.json(result);
          }
        }
      }
    );
  } else {
    res.json({
      response: `College of Department : ${Department} is not present`,
    });
  }
});

module.exports = router;
