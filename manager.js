//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


//Connect to Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    //Your username
    user: "root",
    //your password
    password: "Original17",
    database: "bamazonDB"
});

function displayMenu() {
	//Find out what manager wants to do
	inquirer.prompt([
			{
				name: "manage",
				type: "list",
				message: "What needs to be done?",
				choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
			}
		]).then(function(answer){
			//User answer to launch correct function
			switch (answer.manage) {
				case "View Products for Sale":
					displayProducts();
					break;
				case "View Low Inventory":
					displayLowStock();
					break;
				case "Add to Inventory":
					restockInfo();
					break;
				case "Add New Product":
					newProductInfo();
					break;
			}
		});
};

function displayProducts() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		//New table constructor
		var displayTable = new Table({
			//Set table columns
			head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
			//Set Column widths
			colWidths: [10, 20, 20, 10, 20]
		});
		//Loop through sql table
		for (i = 0; i < res.length; i++) {
			//And push to new table
			displayTable.push([
					res[i].item_id,
					res[i].product_name,
					res[i].department_name,
					res[i].price,
					res[i].stock_quantity
				]);
		}
		//Log the table to console
		console.log(displayTable.toString());
		displayMenu();
	});
};

function displayLowStock() {
		connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err, res) {
		if (err) throw err;
		//New table constructor
		var displayTable = new Table({
			//Set table columns
			head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
			//Set Column widths
			colWidths: [10, 20, 20, 10, 20]
		});
		//Loop through sql table
		for (i = 0; i < res.length; i++) {
			//And push to new table
			displayTable.push([
					res[i].item_id,
					res[i].product_name,
					res[i].department_name,
					res[i].price,
					res[i].stock_quantity
				]);
		}
		//Log the table to console
		console.log(displayTable.toString());
		displayMenu();
	});
};

function restockInfo() {
	//Get info on what to restock
	inquirer.prompt([
			{
				name: "ID",
				type: "input",
				message: "What is the ID of the item you want to restock?"
			},
			{
				name: "Quantity",
				type: "input",
				message: "How many are you stocking?"
			},
		]).then(function(answer){
			//Save answers as variable to pass through to restock function
			var restockID = answer.ID;
			var restockAmount = answer.Quantity;
			restock(restockID, restockAmount);
		});
};

function restock(id, amount) {
	//Update database with restock info
	connection.query("SELECT * FROM products WHERE item_id = ?", [id], function(err, res) {
		if (err) throw err;
		connection.query("UPDATE products SET stock_quantity = stock_quantity + " + amount + " WHERE item_id = " + id);
		//Display stock to show update
		displayProducts();
	});
};

function newProductInfo() {
	//Get info on new product
	inquirer.prompt([
			{
				name: "name",
				type: "input",
				message: "What is the new product's name?"
			},
			{
				name: "department",
				type: "input",
				message: "What Department does it belong to?"
			},
			{
				name: "cost",
				type: "input",
				message: "How much will we sell it for?"
			},
			{
				name: "amount",
				type: "input",
				message: "How many are we stocking?"
			}
		]).then(function(answers){
			//Store answers as variable to pass to addNewProduct function
			var name = answers.name;
			var dept = answers.department;
			var price = answers.cost;
			var quantity = answers.amount;
			addNewProduct(name, dept, price, quantity);
		});
};

function addNewProduct(name, dept, price, quantity) {
	//Insert into database
	connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [name, dept, price, quantity]);
	//Display table of products to show new product
	displayProducts();
}

displayMenu();








