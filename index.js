const walletController = require("./walletController");
const mysql = require("mysql");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "multicurrency",
});

connection.connect((error) => {
  if (error) {
    return console.log("Error connecting to MySQL Database.");
  }
  console.log("Connection established successfully.");
});

// GET request to view all of the user's wallets
app.get("/viewWallets", walletController.viewAllCurrencyWallets);
// GET request for user to view a requested particular wallet
app.get("/viewWallets/:wallet", walletController.viewReqCurrencyWallet);
