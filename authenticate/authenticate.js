const express = require('express')
const app = express()

// var str = JSON.stringify('./data/user.json')
// var users = JSON.parse(str)

users = [
	{
	  "id": "1",
	  "username": "user101",
	  "password": "123456",
	  "name": "Jacky"
	},
	{
	  "id": "2",
	  "username": "user102",
	  "password": "123456",
	  "name": "Jane"
	},
	{
	  "id": "3",
	  "username": "user103",
	  "password": "123456",
	  "name": "Tom"
	},
	{
	  "id": "4",
	  "username": "user104",
	  "password": "123456",
	  "name": "Helen"
	},
	{
	  "id": "5",
	  "username": "user105",
	  "password": "123456",
	  "name": "Mark"
	}
  ]
  


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


