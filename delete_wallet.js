const express = require('express');
const app = express();

var wallets = JSON.parse('./data/currency.json')


app.delete('deletewallet/:id', (req, res) => {
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


    // SQL Table
})





app.listen(3000)