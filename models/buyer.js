"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Buyer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
          isEmail: { message: "Please Enter A Valid Email Address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          min: 5,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "buyer",
      },
    },
    {
      sequelize,
      modelName: "Buyer",
    }
  );
  return Buyer;
};
