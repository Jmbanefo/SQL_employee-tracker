const inquirer = require("inquirer"); 
const mysql = require("mysql2"); 
const consoleTable = require("console.table"); 
const { connect } = require("http2");
const { type } = require("os");
const { Console, error } = require("console");


const db = mysql.createConnection( 
    { 
        host: 'localhost', 
        user: 'root', 
        password:"987", 
        database: tracker_db, 

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
        choices: [ "View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Update an employee role","Exit",]
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
    inquirer.prompt ([
        {
        type: 'input', 
        name: "departmentName", 
        message: " Please enter the name of the department"
        },
    ])
    .then((response) => { 
        db.query( `Insert INTO department (name) VALUES ("${answer.departmentName}")`) // Check departmentName
        promptMenu(); 
    })
}
function addRole(){ 
    db.query(`SELECT * FROM department`, (err, resultes) => { 
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
          choices: departmentName.map((department) => ({ 
            name: departmentName, 
            value: departmentId // Check these last 3 lines
          }))
          },
        ])
        .then((response) => { 
            db.query( `INSERT INTO roles (title, department_id, salary) VALUES ("${response.roleName}", "${response.departmentName}", "${response.roleSalary})`); 
            promptMenu(); 
        })
    })
}

function  addEmployee(){ 
   db.query(`SELECT * FROM roles`, (err, roles) => {
   if (err) throw err;
   db.query(`SELECT * FROM employee`, (err, EmployeeManager) => { 
    if (err) throw err;
    consoleTable(roles); 
    consoleTable(results); 

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
        const findRole = roles.find((role) => role.title === response.employeeRole);
        const findManager = EmployeeManager.find(
          (manager) =>
            `${manager.first_name} ${manager.last_name}` === response.employeeManager
        );
        db.query() //
    })
   })
});      
}

function updatedEmployee(){ 

}

function quit() { 
    console.log("Thank you for using the Employee Tracker!");
    return; 
}