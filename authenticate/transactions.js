const express = require('express')
const mysql = require('mysql')

var strTransactions = JSON.stringify('./data/transaction.json')
var transactions = JSON.parse(strTransactions)  

// Creating connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'multicurrency'
});

// Connecting
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...')
})

const app = express()


// Getting transactions table
app.get('/transactions', (req, res) => {
    let sql = 'SELECT * FROM transactions'

    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.status(200).send('Transactions fetched...')
    })
})


// Adding new transaction
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


app.listen('3000', () => {
    console.log('Server started on port 3000')
})

