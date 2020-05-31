const express = require("express");
const router = express.Router();
const connection = require("../db_connection");

router.get("/", (req, res) => {

    const city = req.query.city;
    const state = req.query.state;
    const course = req.query.course;
    const Department = req.query.department
    let query = "";
    if (city != '' && state === '' & course === '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and city="${city}";`

    }
    if (city === '' && state != '' & course === '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and state="${state}";`

    }
    if (city === '' && state === '' & course != '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and CourseId=${course};`

    }
    if (city != '' && state != '' & course === '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and city="${city}" and state="${state}";`

    }
    if (city != '' && state === '' & course != '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and city="${city}" and CourseId=${course};`

    }
    if (city === '' && state != '' & course != '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and state="${state}" and CourseId=${course};`

    }
    if (city != '' && state != '' & course != '') {
        query = `select 
        CollegeDetail.Id,CollegeName,Logo,City,State,Fees,MedianSalary,Rating,Website  
        from CollegeDetail, Courses, Address 
        where CourseId=Courses.id and AddressId=Address.id and Department="${Department}" and city="${city}" and state="${state}" and CourseId=${course};`

    }
    connection.query(
        query,
        (err, result, fields) => {
            if (err) {
                res.status(400).send({ error: err });
            } else {
                console.log(">>> get call...");
                    res.json(result);
            }
        }
    );
});

module.exports = router;
