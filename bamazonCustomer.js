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
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  currentInventory();
  console.log('Welcome to Bamazon! Current hot items in stock: ')
  console.log('-----------------------------------------------------------')
}

//Displays items currently in stock
function currentInventory() {
  queryData = 'SELECT * FROM products';

  connection.query(queryData, function (err, data) {
    if (err) throw err;


    //loops through data base and displays items
    let inventory = '';
    for (var i = 0; i < data.length; i++) {
      inventory = '';
      inventory += 'Item ID: ' + data[i].item_id + '  //  ';
      inventory += 'Product Name: ' + data[i].product_name + '  //  ';
      inventory += 'Department: ' + data[i].department_name + '  //  ';
      inventory += 'Price: $' + data[i].price + '\n';
      console.log(inventory);
    }
    userPurchase();
  })
}

//ask user what to purchase
function userPurchase() {
  inquirer.prompt([{
      type: 'input',
      name: 'item_id',
      message: 'Please enter the Item ID for the item you would like to purchase.',
      validate: validateInput
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: validateQuantityInput
    }
  ]).then(function (input) {
    let item = input.item_id;;
    let quantity = input.quantity;

    let queryResult = 'SELECT * FROM products WHERE ?';

    connection.query(queryResult, {
      item_id: item
    }, function (err, data) {
      if (err) throw err;


      let products = data[0];
      //if item is in stock
      if (quantity <= products.stock_quantity) {
        console.log('Purchase made');

        //update inventory
        let updateInventory = 'UPDATE products SET stock_quantity = ' + (products.stock_quantity - quantity) + ' WHERE item_id = ' + item;

        connection.query(updateInventory, function (err, data) {
          if (err) throw err;

          console.log('Your order has been placed. Total is $' + products.price * quantity);


        })

        connection.end()
      } else {

        console.log('Item purchase may exceed inventory amount or item is out of stock.')
        currentInventoryStock();
      }


    })

  })

};

//validation for item choice
function validateInput(value) {
  if (isNaN(value) == false && parseInt(value) <= 10 && parseInt(value) > 0) {
    return true;
  } else {
    return 'Enter a ID Number from the current stock';
  }
}
//validation for Quantity
function validateQuantityInput(value) {
  if (isNaN(value) == false) {
    return true;
  } else {
    return 'Enter a valid quantity amount';
  }
}

//if out of stock or purchase over inventory amount
function currentInventoryStock() {
  queryData = 'SELECT * FROM products';

  connection.query(queryData, function (err, data) {
    if (err) throw err;


    //loops through data base and displays items
    let inventoryStock = '';
    for (var i = 0; i < data.length; i++) {
      inventoryStock = '';
      inventoryStock += 'Item ID: ' + data[i].item_id + '  //  ';
      inventoryStock += 'Product Name: ' + data[i].product_name + '  //  ';
      inventoryStock += 'Current Inventory: ' + data[i].stock_quantity + '\n';
      console.log(inventoryStock);
    }
    userPurchase();
  })
}