const express = require('express');
const app = express();
const mysql = require('mysql')

var wallets = JSON.parse('./data/wallet.json')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    // database: 'wallets'
});

// Creating Table
app.get('/createwallets', (req, res) => {
    let sql = 'CREATE TABLE wallets(user_id int AUTO_INCREMENT, name TEXT, PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('WALLETS table created...');
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
        res.send('Wallet deleted')
    })
})


app.listen(3000)