module.exports = (sequelize, DataTypes) => {
  const TvShow = sequelize.define("tvshow", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // year: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // watchlist: {
    //   type: DataTypes.BOOLEAN,
    // },
    seasons: {
      type: DataTypes.INTEGER,
    },
    userScore: {
      type: DataTypes.INTEGER,
    },
    review: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return TvShow;
};