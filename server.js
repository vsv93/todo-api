var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1;

app.use(bodyParser.json());
app.get('/', function(req, res) {
	res.send('Todo API root!');
});

app.get('/todos', function(req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed == 'true') {
		filteredTodos = _.where(filteredTodos, {
			completed: true
		});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed == 'false') {
		filteredTodos = _.where(filteredTodos, {
			completed: false
		});
	}
	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function(todo) {
			return todo.description.indexOf(queryParams.q) > -1;
		});
	}

	res.json(filteredTodos);
});

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var todoObject = _.findWhere(todos, {
		id: todoId
	});
	if (todoObject) {
		res.json(todoObject);
	} else {
		res.status(404).send('ID does not exist!!');
	}
});

app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	db.todo.create(body).then(function(todo){
		res.json(todo.toJSON());
	}, function(e){
		res.status(400).json(e);
	});
	// if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length == 0) {
	// 	return res.status(400).send();
	// }
	// body.description = body.description.trim();
	// body.id = todoNextID++;
	// todos.push(body);
	// res.json(body);
});

app.put('/todos/:id', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	var validAttrib = {};
	var todoId = parseInt(req.params.id, 10);
	var todoObject = _.findWhere(todos, {
		id: todoId
	});
	if (!todoObject) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttrib.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		res.status(400).send();
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttrib.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		res.status(400).send();
	}
	_.extend(todoObject, validAttrib);
	res.json(todoObject);
});

app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var todoObject = _.findWhere(todos, {
		id: todoId
	});
	if (!todoObject) {
		return res.status(400).send();
	}
	todos = _.without(todos, todoObject);
	res.json(todoObject);
})

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Server started at port: ' + PORT);
	});
});