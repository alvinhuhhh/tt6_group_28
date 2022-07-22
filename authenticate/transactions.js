const express = require('express')
const mysql = require('mysql')

var strTransactions = JSON.stringify('./data/transaction.json')
var transactions = JSON.parse(strTransactions)  

// Creating connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transactions'
});

// Connecting
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...')
})

const app = express()


// Creating transaction table
app.get('/createtransactiontable', (req, res) => {
    let sql = 'CREATE TABLE transactions(id int AUTO_INCREMENT, wallet_id FOREIGN_KEY, debit_id FOREIGN_KEY, debit_currency VARCHAR(3), debit_amount FLOAT, credit_id FOREIGN_KEY, credit_currency VARCHAR(3), credit_amount FLOAT, description TEXT, created_at DATETIME, created_by TEXT, updated_at DATETIME, updated_by TEXT, PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('POSTS table created...');
    })
})

// Getting transactions table
app.get('/transactions', (req, res) => {
    let sql = 'SELECT * FROM transactions'

    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send('Transactions fetched...')
    })
})



app.listen('3000', () => {
    console.log('Server started on port 3001')
})

