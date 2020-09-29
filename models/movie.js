module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // rating: {
    //   type: DataTypes.Array(DataTypes.STRING),
    //   allowNull: false,
    // },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    watchlist: {
      type: DataTypes.BOOLEAN,
    },
    runtime: {
      type: DataTypes.INTEGER,
    },
    userscore: {
      type: DataTypes.INTEGER,
    },
    liked: {
      type: DataTypes.BOOLEAN,
    },
    review: {
      type: DataTypes.STRING,
    },
  });
  return Movie;
};

//test
