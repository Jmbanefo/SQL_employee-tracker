const inquirer = require("inquirer"); 
const mysql = require("mysql2"); 
const consoleTable = require("console.table"); 


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
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "Exit",
        ]
        } 
    ])
}

