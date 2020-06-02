const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "p",
  database: "gurukul1",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting to database...");
    return;
  }
  console.log("connected as id " + connection.threadId);
});

var CollegeDetail = require('./College.json')
var AddressDetail=require('./Address.json')
var Courses=require('./Course.json')
var College=CollegeDetail.College
var Address=AddressDetail.Address
var Course=Courses.courses

for(i=0;i<Address.length;i++){
  connection.query('INSERT INTO Address SET ?', Address[i], function (error, results, fields) {
    if (error) throw error;
  });
}

for(i=0;i<Course.length;i++){
  connection.query('INSERT INTO Courses SET ?', Course[i], function (error, results, fields) {
    if (error) throw error;
  });
}


for(let i=0;i<College.length;i++){
    connection.query('INSERT INTO CollegeDetail SET ?', College[i], function (error, results, fields) {
        if (error) throw error;
      });
    
}



connection.end()