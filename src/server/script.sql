CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'p' ;
GRANT ALL PRIVILEGES ON * . * TO 'test'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS gurukul;

USE gurukul;


CREATE TABLE IF NOT EXISTS Address(
    id INT AUTO_INCREMENT PRIMARY KEY,
    City CHAR(30) NOT NULL,
    State CHAR(30) NOT NULL,
    Adress1 CHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Courses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    CourseName CHAR(30) NOT NULL,
    Department CHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS CollegeDetail ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    CollegeName CHAR(50) NOT NULL, 
    Logo CHAR(50) NOT NULL,
    Image1 CHAR(50) NOT NULL,
    Image2 CHAR(50) NOT NULL,
    Image3 CHAR(50) NOT NULL,
    AddressId INT NOT NULL,
    Fees INT ,
    MedianSalary INT ,
    Rating INT NOT NULL,
    Website CHAR(50) NOT NULL,
    Description CHAR(200) NOT NULL,
    Phone CHAR(50) NOT NULL,
    CourseId INT NOT NULL,
    FOREIGN KEY(AddressId) 
       REFERENCES Address(id),
    FOREIGN KEY(CourseId) 
       REFERENCES Courses(id)
    );




