const express = require('express')
const app = express()

var strUsers = JSON.stringify('./data/user.json')
var users = JSON.parse(strUsers)  


app.post('/login', (req, res) => {

    // Input validation
	var username = req.body.username
	var password = req.body.password

	for(var i = 0; i < users.length; i++) {
		// check user input matches username and password of a current index of the user array
		if(username == users[i].username && password == users[i].password) {
			console.log(username + " is logged in")
			res.status(200)
			return
            }
    }
	res.status(400)
});


app.listen(3000)


