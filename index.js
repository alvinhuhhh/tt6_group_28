const walletController = require("./walletController");
const mysql = require("mysql");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "multicurrency",
});

connection.connect((error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Connection established successfully.");
});

// GET request to view all of the user's wallets
app.get("/viewWallets", walletController.viewAllCurrencyWallets);
