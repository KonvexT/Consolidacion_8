const {Sequelize} = require("sequelize");
const conexion = new Sequelize({
    host: "localhost",
    port: 5432,
    database: "db_jwtbootcamp",
    username: "postgres",
    password: "postgres",
    dialect: "postgres"
})

module.exports = conexion;