const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// ESTABLISH DATABASE CONNECTION
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "calcle37",
  database: "multicurrency",
});

connection.connect((error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Connection established successfully.");
});

// LISTEN FOR REQUESTS
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// FUNCTIONS
// This function return a response with all of the user's currency-wallets, the respective currencies and the wallet balances
viewAllCurrencyWallets = (req, res) => {
  const username = req.body.username;

  const sql = `SELECT w.name, c.currency, c.amount FROM user u LEFT JOIN wallet w ON u.id = w.user_id LEFT JOIN currency c ON w.id = c.wallet_id WHERE u.username = '${username}'`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid request.",
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "You do not have any currency wallet.",
      });
    }

    console.log(results);

    res.status(200).json({
      status: 200,
      data: {
        results,
      },
    });
  });
};

// GET request to view all of the user's wallets
// Returns a response with all of a user's currency-wallets
app.get("/viewWallets", viewAllCurrencyWallets);

//get all exchange rate
app.get("/getExchangeRate", (req, res) => {
  let sql = `SELECT * FROM exchange_rate`;
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error.",
      });
    } else {
      res.status(200).send(result);
    }
  });
});

//get single exchange rate
app.get("/getExchangeRate/:id", (req, res) => {
  let sql = `SELECT * FROM exchange_rate WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error.",
      });
    } else if (result.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Exchange rate does not exist.",
      });
    } else {
      res.status(200).send(result);
    }
  });
});

//get user wallets
app.get("/getWallet", (req, res) => {
  const username = req.body.username;
  connection.query(
    `SELECT id from user WHERE username = '${username}'`,
    (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "Wallet does not exist.",
        });
      } else {
        //console.log(result);
        const id = result[0].id;
        console.log(id);
        connection.query(
          `SELECT * from wallet where user_id = '${id}'`,
          (err, result) => {
            console.log(result);
            res.status(200).send(result);
          }
        );
      }
    }
  );
});

app.delete("/deletewallet/:id", (req, res) => {
  // DELETING FROM SQL TABLE
  let sql = `DELETE FROM wallet WHERE id = ${req.params.id}`;
  let query = connection.query(sql, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to delete wallet.",
      });
    } else if (result.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Wallet does not exist.",
      });
    }
    console.log(result);
    res.status(200).send("Wallet successfully deleted.");
  });
});
