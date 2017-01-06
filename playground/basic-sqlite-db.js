var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-db.sqlite'
});
var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	//force : true
}).then(function() {
	console.log('Everything synced!!');

	User.findById(1).then(function(user){
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function(todos){
			todos.forEach(function(todo){
				console.log(todo.toJSON());
			})
		})
	})
	// User.create({
	// 	email: 'abc@xyz.com'
	// }).then(function(){
	// 	return Todo.create({
	// 		description: 'Learn Node.js'
	// 	});
	// }).then(function(todo){
	// 	User.findById(1).then(function(user){
	// 		user.addTodo(todo);
	// 	});
	// });

});
	// Todo.findById(11).then(function(todo){
	// 	if(todo){
	// 		console.log(todo.toJSON());
	// 	}else{
	// 		console.log('Doesnt exist');
	// 	}
		
	// }).catch(function(e){
	// 	console.log(e);
	// })

	// Todo.create({
	// 	description: 'Build todo app'
	// 		// completed: false
	// }).then(function(todo) {
	// 	return Todo.create({
	// 		description: 'Build chat app'
	// 	})
	// }).then(function(){
	// 	//return Todo.findById(1)
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like : '%to%'
	// 			}
	// 		}
	// 	});
	// }).then(function(todos){
	// 	if(todos){
	// 		todos.forEach(function(todo){
	// 			console.log(todo.toJSON());
	// 		})
	// 	}else{
	// 		console.log('Doesnt exist');
	// 	}
	// }).catch(function(e) {
	// 	console.log(e);
	// });