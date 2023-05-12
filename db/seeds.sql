INSERT INTO departments (name)
VALUES ('Legal'), ('Finance'), ('Engineering'), ('Sales'); 

INSERT INTO roles (title, salary, department_id)
VALUES ('Project Manager', 60000, 1),('Scrum Master', 120000, 1),('Software engineer', 90000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Rick', 'James', 1, NULL), ('John', 'Wayne', 3, 1); 
