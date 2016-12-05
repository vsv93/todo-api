var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var todos =[];
var todoNextID = 1;

app.use(bodyParser.json());
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

app.post('/todos', function(req, res){
	var body = req.body;
	body.id = todoNextID++;
	todos.push(body);	
	res.json(body);
});
app.listen(PORT, function(){
	console.log('Server started at port: '+PORT);
})