const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {
  const city = req.query.city;
  const state = req.query.state;
  const course = req.query.course;
  const Department = req.query.department;
  let query = `select CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website from CollegeDetail, Courses, Address where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and`;

  if (city != "" && (state === "") & (course === "")) {
    query = `${query} city="${city}";`;
  }
  if (city === "" && (state != "") & (course === "")) {
    query = `${query} state="${state}";`;
  }
  if (city === "" && (state === "") & (course != "")) {
    query = `${query} CourseId=${course};`;
  }
  if (city != "" && (state != "") & (course === "")) {
    query = `${query} city="${city}" and state="${state}";`;
  }
  if (city != "" && (state === "") & (course != "")) {
    query = `${query} city="${city}" and CourseId=${course};`;
  }
  if (city === "" && (state != "") & (course != "")) {
    query = `${query} state="${state}" and CourseId=${course};`;
  }
  if (city != "" && (state != "") & (course != "")) {
    query = `${query} city="${city}" and state="${state}" and CourseId=${course};`;
  }
  connection.query(query, (err, result, fields) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
