const express = require('express')
const app = express()
import json


var users = JSON.parse('./data/user.json')


app.post('/login', (req, res) => {

    // Input validation
	var username = req.body.username
	var password = req.body.password

	for(var i = 0; i < users.length; i++) {
		// check user input matches username and password of a current index of the user array
		if(username == users[i].username && password == users[i].password) {
			console.log(username + " is logged in")
			res.redirect('/dashboard')
			return
            }
    }
});


app.listen(3000)