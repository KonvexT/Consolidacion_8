const { DataTypes} = require("sequelize");
const conexion = require("../config/db.config.js");
const User = require("./user.model.js");

const Bootcamp = conexion.define("bootcamps", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
})

module.exports = Bootcamp;