const express = require('express')
const app = express()


var users = [
	{
		username: "John Smith",
		password: "password"
	},
	{
		username: "Bob Jones",
		password: "password2"
	}
]


app.post('/login', (req, res) => {

    // Input validation
	var username = req.body.username
	var password = req.body.password

	for(var i = 0; i < users.length; i++) {
		// check is user input matches username and password of a current index of the user array
		if(username == user[i].username && password == user[i].password) {
			console.log(username + " is logged in")
			res.redirect('/dashboard')
			return
            }
    }
});


app.listen(3000)