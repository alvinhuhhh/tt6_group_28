const mysql = require("mysql2");
const express = require("express");
const app = express();

// ESTABLISH DATABASE CONNECTION
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
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

// GLOBAL MIDDLEWARES
app.use(express.json());

// FUNCTIONS
// This function return a response with all of a user's currency-wallets
viewAllCurrencyWallets = (req, res) => {
  const username = req.body.username;

  const sql = `SELECT u.id, u.name, w.name FROM user u LEFT JOIN wallet w on u.id = w.user_id WHERE u.name = '${username}'`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      throw error;
      return res.status(404).json({
        status: "fail",
        message: "Invalid request.",
      });
    }
    if (!results) {
      return res.status(400).json({
        status: "fail",
        message: "You do not have any currency wallets.",
      });
    }

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
