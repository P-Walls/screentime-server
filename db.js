const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
dialect: 'postgres',
});

sequelize.authenticate().then(
	function(){
		console.log('Connected to screentime postgres database');
	},
	function(err){
		console.log(err);
	}
);

User = sequelize.import('./models/user');
Movie = sequelize.import('./models/movie');
TVShow = sequelize.import('./models/tvshow');

Movie.belongsTo(User);
TVShow.belongsTo(User);

User.hasMany(Movie);
User.hasMany(TVShow);

module.exports = sequelize;