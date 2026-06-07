// models/Hello.js

const sequelize =
    require("../database");

const {
    DataTypes
} = require("sequelize");

const Hello = sequelize.define(
    "hello",
    {
        message: DataTypes.STRING
    }
);

module.exports = Hello;
