const mysql = require("mysql2");
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

// FUNCTIONS
// This function return a response with all of a user's currency-wallets the currency and the wallet balances
viewAllCurrencyWallets = (req, res) => {
  const username = req.body.username;

  const sql = `SELECT w.name,c.currency, c.amount FROM user u LEFT JOIN wallet w on u.id = w.id LEFT JOIN currency c on u.id = c.id WHERE u.username = 'user101'`;
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

//get all exchange rate
app.get('/getExchangeRate', (req, res) =>{
  let sql = `SELECT * FROM exchange_rate`;
  connection.query(sql, (err, result) =>{
      if(err){
          throw err;
      }else{
          res.status(200).send(result);
      }
  })
})

//get single exchange rate
app.get('/getExchangeRate/:id', (req, res) =>{
  let sql = `SELECT * FROM exchange_rate WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) =>{
      if(err){
          throw err;
      }else{
          res.status(200).send(result);
      }
  })
})

//get user wallets
app.get('/getWallet', (req, res) =>{
  const username = req.body.username;
  connection.query(`SELECT id from user WHERE username = '${username}'`, (err, result) =>{
      if(err){
          throw err;
      }else{
          //console.log(result);
          const id = result[0].id;
          console.log(id);
          connection.query(`SELECT * from wallet where user_id = '${id}'`, (err, result)=>{
              console.log(result);
              res.status(200).send(result);
          })
      }
  })
})

app.delete('/deletewallet/:id', (req, res) => {
  // DELETING ON WEBPAGE
  // Lookup wallet ID
  const wallet = wallets.find(w => w.id === parseInt(req.params.id));
  // Return error if not found
  if (!wallet) {
      res.status(404).send('The wallet with the given ID was not found') 
      return
  }

  // Delete
  const index = wallets.indexOf(wallet);
  wallets.splice(index, 1); 

  // Return remaining wallets
  res.send(wallets)

  // DELETING FROM SQL TABLE
  let sql = `DELETE FROM wallets WHERE id = ${req.params.id}`         // CHANGE THIS DEPENDING ON TABLE
  let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.status(200).send('Wallet deleted')
  })
})