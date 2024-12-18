const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('./auth')
const { User } = require('../models/index')

const encryptPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    req.body.password = await bcrypt.hash(req.body.password, salt)
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error encrypting password', error })
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    console.log('Email recibido:', email)
    const user = await User.findOne({ where: { email } })
    console.log('Resultado de la búsqueda:', user)

    if (user) {
      return res.status(400).json({ message: 'El correo ya está registrado.' })
    }
    next()
  } catch (error) {
    console.error('Error verificando el correo:', error) 
    res.status(500).json({ message: 'Error verificando el correo.', error })
  }
}

module.exports = { verifyEmail, encryptPassword }
