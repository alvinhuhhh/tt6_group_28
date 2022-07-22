const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Login page');
});

app.listen(3000)

