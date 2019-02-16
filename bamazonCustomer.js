// Pull in required dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');

// Define the MySQL connection parameters
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'root',
    database: 'Bamazon'
});
// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
function start() {
    currentInventoryStock();
  }
  
//Displays items currently in stock
function currentInventoryStock() {
    queryData = 'SELECT * FROM products';

    connection.query(queryData, function (err, data) {
        if (err) throw err;

        console.log('Current Stock: ')

        let dataBase = '';
        for (var i = 0; i < data.length; i++) {
            dataBase = '';
            dataBase += 'Item ID: ' + data[i].item_id + '  //  ';
            dataBase += 'Product Name: ' + data[i].product_name + '  //  ';
            dataBase += 'Department: ' + data[i].department_name + '  //  ';
            dataBase += 'Price: $' + data[i].price + '\n';
            console.log(dataBase);
        }
    })
}


