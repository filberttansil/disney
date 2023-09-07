"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, { foreignKey: "AuthorId" });
      Movie.belongsTo(models.Genre);
      Movie.hasMany(models.Cast);
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required!",
          },
          notEmpty: {
            msg: "Title is required!",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Slug is required!",
          },
          notEmpty: {
            msg: "Slug is required!",
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Synopsis is required!",
          },
          notEmpty: {
            msg: "Synopsis is required!",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
          min: 1,
        },
      },
      GenreId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      AuthorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
