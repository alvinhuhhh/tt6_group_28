const express = require('express');
const app = express();


var wallet = [
	{
		id: 1,
	},
	{
		id: 2,
        wallet: 
	}
]

app.delete('user/:id', (req, res) => {
    // Look up code. If non-existent, return 404
    const user = users.find(c => u.userID === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found') 
        return
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);       // at position of index, delete 1 item

    // Return the same course
    res.send(courses)
})



app.listen(3000, () => console.log('Listening on port 3000...'));