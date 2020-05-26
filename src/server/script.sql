CREATE USER 'nayan'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nayan' ;
GRANT ALL PRIVILEGES ON * . * TO 'nayan'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS crud_db;

USE crud_db;


CREATE TABLE IF NOT EXISTS user_detail ( id INT AUTO_INCREMENT PRIMARY KEY, name CHAR(30) NOT NULL, age INT NOT NULL, department CHAR(25) NOT NULL, subject CHAR(50) );


