const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    username: "user101",
    password: "123456",
    name: "Jacky",
  },
  {
    id: 2,
    username: "user102",
    password: "123456",
    name: "Jane",
  },
  {
    id: 3,
    username: "user103",
    password: "123456",
    name: "Tom",
  },
  {
    id: 4,
    username: "user104",
    password: "123456",
    name: "Helen",
  },
  {
    id: 5,
    username: "user105",
    password: "123456",
    name: "Mark",
  },
];

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
const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// FUNCTIONS
// This function return a response with all of the user's currency-wallets, the respective currencies and the wallet balances
viewAllCurrencyWallets = (req, res) => {
  const username = req.body.username;

  const sql = `SELECT w.name, c.currency, c.amount FROM user u 
  LEFT JOIN wallet w ON u.id = w.user_id LEFT JOIN currency c ON w.id = c.wallet_id WHERE u.username = '${username}'`;
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
////////////////////////////////////////////////////////////////////////////////////////////////////
// API : get user's currency-wallets
app.get("/viewWallets", viewAllCurrencyWallets);
////////////////////////////////////////////////////////////////////////////////////////////////////

// API : get all exchange rate
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
////////////////////////////////////////////////////////////////////////////////////////////////////

//API : get single exchange rate
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
////////////////////////////////////////////////////////////////////////////////////////////////////

//API : get user wallets
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
        console.log(result);
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
////////////////////////////////////////////////////////////////////////////////////////////////////

//API : delete wallet
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

////////////////////////////////////////////////////////////////////////////////////////////////////

// API : Login
app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  for (var i = 0; i < users.length; i++) {
    // check user input matches username and password of a current index of the user array
    if (username == users[i].username && password == users[i].password) {
      console.log(username + " is logged in");
      res.status(200).send(username + " is logged in");
      return;
    }
  }
  res.status(404).send("Incorrect username or password");
});
////////////////////////////////////////////////////////////////////////////////////////////////////
// API: transaction
app.get('/transactions/new', (req, res) => {

  var id = JSON.stringify(req.body.id)
  var wallet_id = JSON.stringify(req.body.wallet_id)
  var debit_id = JSON.stringify(req.body.debit_id)
  var debit_currency = JSON.stringify(req.body.debit_currency)
  var debit_amount = JSON.stringify(req.body.debit_amount)
  var credit_id = JSON.stringify(req.body.credit_id)
  var credit_currency = JSON.stringify(req.body.credit_currency)
  var credit_amount = JSON.stringify(req.body.credit_amount)
  var description = JSON.stringify(req.body.description)
  var created_at = JSON.stringify(req.body.created_at)
  var created_by = JSON.stringify(req.body.created_by)
  var updated_at = JSON.stringify(req.body.updated_at)
  var updated_by = JSON.stringify(req.body.updated_by)


  let sql = `INSERT INTO transaction (id, wallet_id, debit_id, debit_currency, debit_amount, credit_id, credit_currency, credit_amount, description, created_at, created_by, updated_at, updated_by) 
  VALUES ("${id}", "${wallet_id}", "${debit_id}", "${debit_currency}", "${debit_amount}", "${credit_id}", "${credit_currency}", "${credit_amount}", "${description}", "${created_at}", "${created_by}", "${updated_at}", "${updated_by}")`
  let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send('Transaction created')
  })
})
