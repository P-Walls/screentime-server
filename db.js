const Sequelize = require('sequelize');
//const sequelize = new Sequelize(process.env.DATABASE_URL, {
const sequelize = new Sequelize('screentime-reviews','postgres', process.env.PASS, {
host: 'localhost',
dialect: 'postgres'
});

sequelize.authenticate().then(
	function(){
		console.log('Connected to screentime postgres database');
	},
	function(err){
		console.log(err);
	}
);

module.exports = sequelize;