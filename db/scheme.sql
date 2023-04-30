DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db; 

USE tracker_db; 

CREATE TABLE departments (
    id INT auto_increment,
    name VARCHAR(30), 
    PRIMARY KEY (id), 
)

CREATE TABLE roles ( 
    id INT auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL, 
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id) ON DELETE SER NULL
)
CREATE TABLE employees ( 
    id INT auto_increment, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT REFERENCES (employee(id))
    FOREIGN KEY (role_id) REFERENCES (roles(id))
    ON DELETE SET NULL 

)