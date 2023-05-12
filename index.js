const inquirer = require("inquirer"); 
const mysql = require("mysql2"); 
const consoleTable = require("console.table"); 
const { connect } = require("http2");
const { type } = require("os");
const { Console, error, log } = require("console");


const db = mysql.createConnection( 
    { 
        host: '127.0.0.1', 
        user: 'root', 
        password:"Egondu_95", 
        database: "tracker_db", 

    },
    console.log('Successfully connected to the tracker_db database')
); 

function promptMenu() { 
    inquirer
    .prompt([
        {
        type: "list", 
        name: "menu", 
        message: "What would you like to do?", 
        choices: [ "View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Update an employee","Exit",]
        } 
    ])
    .then ((answer) => { 
        switch (answer.menu) { 
            case "View all departments": 
            viewDepartments(); 
            break; 
            case "View all roles":  
            viewRoles(); 
            break; 
            case "View all employees": 
            viewEmployees(); 
            break; 
            case "Add a department": 
            addDepartment(); 
            break; 
            case "Add a role": 
            addRole(); 
            break; 
            case "Add an employee": 
            addEmployee(); 
            break; 
            case "Update an employee": 
            updatedEmployee(); 
            break; 
            case "Exit": 
            quit(); 
            break; 

        }
    }); 
}

function viewDepartments() { 
    db.query( `Select * From departments`, (err, results) => { 
        if (err) throw err; 
        console.table(results);
        promptMenu(); 
    })
}
function viewRoles() { 
    db.query( `Select * From roles`, (err, results) => { 
        if (err) throw err; 
        console.table(results);
        promptMenu(); 
    })
}
function  viewEmployees() { 
    db.query( `Select * From employees`, (err, results) => { 
        if (err) throw err; 
        console.table(results);
        promptMenu(); 
    })
}
function addDepartment(){ 
    inquirer.prompt([
        {
        type: 'input', 
        name: "departmentName", 
        message: " Please enter the name of the department"
        },
    ])
    .then((response) => { 
        db.query( `Insert INTO departments (name) VALUES ("${response.departmentName}")`) 
        promptMenu(); 
    })
}
function addRole(){ 
    db.query(`SELECT * FROM departments`, (err, results) => { 
        if (err) throw err; 
        inquirer.prompt([
            { 
                type: "input",
                name: "roleName",
                message: "Please enter the title of the role:",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Please enter the salary of the role:",
            },
          {
          type: "list",
          name: "deptRole",
          message: "Please select the department of the role:",
          choices: results.map((departmentMap) => ({ 
            name: departmentMap.name, 
            value: departmentMap.id 
          }))
          },
        ])
        .then((response) => { 
            db.query( `INSERT INTO roles (title, department_id, salary) VALUES ("${response.roleName}", "${response.deptRole}", ${response.roleSalary})`); 
            promptMenu(); 
        })
    })
}

function  addEmployee(){ 
   db.query(`SELECT * FROM roles`, (err, roles) => {
   if (err) throw err;
   db.query(`SELECT * FROM employees`, (err, EmployeeManager) => { 
    if (err) throw err;
    console.table(roles); 
    console.table(EmployeeManager); 

    inquirer.prompt([
        { 
            type: "input",
            name: "employeeFirstName",
            message: "Please enter the employee's first name.",
        }, 
        { 
            type: "input",
            name: "employeeLastName",
            message: "Please enter the employee's last name.", 
        }, 
        { 
            type: "list",
            name: "employeeRole",
            message: "Please enter the employee's role.",
            choices: roles.map((role) => role.title),
        }, 
        {
            type: "list",
            name: "employeeManager",
            message: "Please enter the employees manager.",
            choices: EmployeeManager.map(
            (manager) => `${manager.first_name} ${manager.last_name}`
            ),
        }
    ])
    .then((response) => { 
        const findRole = roles.find((findRole) => findRole.title === response.employeeRole);
        const findManager = EmployeeManager.find(
          (manager) =>
            `${manager.first_name} ${manager.last_name}` === response.employeeManager
        );
        db.query(`INSERT INTO employees SET ?`, 
        { 
            first_name: response.employeeFirstName,
            last_name: response.employeeLastName, 
            role_id: findRole.id, 
            manager_id: EmployeeManager.id, 
        },
        (err, res) => { 
            if(err) throw err; 
            console.log("Successfully added employee");
            promptMenu(); 
        }
        ) 
    })
   })
});      
}

function updatedEmployee(){ 
    db.query(`SELECT * FROM employees`, (err, employee_list) => { 
        if(err) throw err; 
        db.query(`SELECT * FROM roles`, (err, roles) => { 
            if(err) throw err; 
            inquirer.prompt([
                { 
                    type: "list", 
                    name: "updateEmployee", 
                    message: "Please select the employee would you like to update.", 
                    choices: employee_list.map((updatedEmployee) => ({ 
                        name: `${updatedEmployee.first_name} ${updatedEmployee.last_name}`, 
                        value: updatedEmployee.id, 
                    }))
                }, 
                {
                    type: "list",
                    name: "updatedRole",
                    message: "Please selcet the employee's new role.",
                    choices: roles.map((updatedRole) => ({
                        name: updatedRole.title,
                        value: updatedRole.id,
                    }
                    )),
                },
            ])
            .then((response) => { 
                console.log(response);
                db.query(`UPDATE employees SET role_id = ${response.updatedRole} WHERE id = ${response.updatedRole}`, 
                (err, result) => { 
                       if (err) throw err; 
                       console.log("Updated");  
                       console.table(result); 
                       promptMenu();    
                })
            })
            
        })
    })
}

promptMenu(); 

function quit() { 
    console.log("Thank you for using the Employee Tracker!");
    return; 
}