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

function authenticate() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < users.length; i++) {
		// check is user input matches username and password of a current index of the user array
		if(username == user[i].username && password == user[i].password) {
			console.log(username + " is logged in!!!")
			// stop the function if this is found to be true
			return
		}
	}
	console.log("Incorrect username or password")
}




app.listen(3000, () => console.log('Server running on port: http://localhost:3000'))
