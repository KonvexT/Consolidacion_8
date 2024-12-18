const express = require('express')
const {createUser, findUserById, findAllUser, updateUserById, findByEmail, deleteUserById} = require('../controllers/user.controller.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY, verifyToken, encryptPassword, verifyEmail } = require('../middleware/index.js')

const router = express.Router()

router.post('/signin', async (req, res) => {
  try {
    const user = await findByEmail({ where: { email: req.body.email } })
    if (!user) {
      return res.status(404).json({ message: 'Email no encontrado' })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña invalida' })
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { 
      expiresIn: '1h'
    })
    res.status(200).json({ message: 'Logueado correctamente', token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/signup', verifyEmail, encryptPassword, async (req, res) => {
  try {
    const user = await createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/user', verifyToken, async (req, res) => {
  try {
    const users = await findAllUser()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/user/:id', verifyToken, async (req, res) => {
  try {
    const user = await findUserById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/user/:id', verifyToken, async (req, res) => {
  try {
    await updateUserById(req.params.id, req.body)
    res.status(200).json({ message: 'Usuario actualizado con éxito' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/user/:id', verifyToken, async (req, res) => {
  try {
    await deleteUserById(req.params.id, req.body)
    res.status(200).json({ message: 'Usuario eliminado con éxito' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
