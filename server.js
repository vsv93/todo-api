var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos =[{
	id: 1,
	description: 'Learn node.js',
	completed: false
},{
	id: 2,
	description: 'Finish todo app',
	completed: false
},{
	id: 3,
	description: 'Buy groceries',
	completed: false
}];

app.get('/', function(req, res){
	res.send('Todo API root!');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req,res){
	var todoId = parseInt(req.params.id, 10);
	var todoObject;
	for (var i=0; i<todos.length; i++){
		if(todos[i].id == todoId){
			todoObject = todos[i];
		}
	}
	if(todoObject){
		res.json(todoObject);
	}else{
		res.status(404).send('ID does not exist!!');
	}
});
app.listen(PORT, function(){
	console.log('Server started at port: '+PORT);
})