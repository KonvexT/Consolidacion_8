const User = require('../models/user.model.js')
const Bootcamp = require('../models/bootcamp.model.js')
const conexion = require('../config/db.config.js')


Bootcamp.belongsToMany(User, {
  through: 'user_bootcamp',
  as: 'users',
  foreignKey: 'bootcamp_id'
})

User.belongsToMany(Bootcamp, {
  through: 'user_bootcamp',
  as: 'bootcamps',
  foreignKey: 'user_id'
})

module.exports = { Bootcamp, User, conexion }
