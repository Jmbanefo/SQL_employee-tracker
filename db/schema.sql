DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db; 

USE tracker_db; 

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
   
);

CREATE TABLE roles ( 
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL, 
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id) ON DELETE SET NULL
);
CREATE TABLE employees ( 
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT, 
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE SET NULL, 
    FOREIGN KEY (manager_id) REFERENCES employees(id)
    ON DELETE SET NULL 
);