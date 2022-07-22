const express = require('express');
const mysql = require('mysql2');
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "multicurrency"
})

db.connect((err) =>{
    if(err){
        throw err;
    }else{
        console.log('Connected');
    }
});
//get all exchange rate
app.get('/getExchangeRate', (req, res) =>{
    let sql = `SELECT * FROM exchange_rate`;
    db.query(sql, (err, result) =>{
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
    db.query(sql, (err, result) =>{
        if(err){
            throw err;
        }else{
            res.status(200).send(result);
        }
    })
})

app.listen(3000);