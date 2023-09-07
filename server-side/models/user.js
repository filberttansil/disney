"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, { foreignKey: "AuthorId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is registered!",
        },
        validate: {
          notNull: {
            msg: "Email is required!",
          },
          notEmpty: {
            msg: "Email is required!",
          },
          isEmail: {
            msg: "Invalid email format!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required!",
          },
          notEmpty: {
            msg: "Password is required!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};
