create database college;
use college;

CREATE TABLE Student (
    id INT PRIMARY KEY NOT NULL,
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    Age INT,
    CGPA DECIMAL(3, 1) NOT NULL,
    CONSTRAINT CHK_CGPA CHECK (CGPA BETWEEN 0 AND 4.0), 
    CONSTRAINT CHK_Age CHECK (Age >= 0) 
);


CREATE TABLE  admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL DEFAULT 'admin',
    username VARCHAR(50) NOT NULL DEFAULT 'admin',
    password VARCHAR(50) NOT NULL DEFAULT 'admin'
);

INSERT INTO admins (name, username, password) VALUES ('admin', 'admin', 'admin');

INSERT INTO Student (id, Fname, Lname, Age, CGPA) VALUES (22010343, 'Ziad', 'Mohamed', 20, 3.8); 
INSERT INTO Student (id, Fname, Lname, Age, CGPA) VALUES (22010030, 'Ahmed', 'Mohamed', 20, 3.6); 
INSERT INTO Student (id, Fname, Lname, Age, CGPA) VALUES (22011611, 'Mohaned', 'Hossam', 20, 3.5);
INSERT INTO Student (id, Fname, Lname, Age, CGPA) VALUES (22011612, 'Hossam', 'Eldeen', 20, 3.4); 
INSERT INTO Student (id, Fname, Lname, Age, CGPA) VALUES (22011610, 'Mazen', 'Ahmed', 20, 3.8); 



