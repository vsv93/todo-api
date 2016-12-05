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
sequelize.sync().then(function() {
	console.log('Everything synced!!');
	Todo.findById(11).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		}else{
			console.log('Doesnt exist');
		}
		
	}).catch(function(e){
		console.log(e);
	})

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
});