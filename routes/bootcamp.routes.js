const express = require('express')
const {createBootcamp, addUser, findBootcampById, findAllBootcamp} = require('../controllers/bootcamp.controller.js')
const { verifyToken } = require('../middleware/index.js')

const router = express.Router()

router.post('/bootcamp', verifyToken, async (req, res) => {
  try {
    const user = await createBootcamp(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/bootcamp/adduser', verifyToken, async (req, res) => {
  try {
    const user = await addUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/bootcamp', async (req, res) => {
  try {
    const user = await findAllBootcamp(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/bootcamp/:id', verifyToken, async (req, res) => {
  try {
    const user = await findBootcampById(req.params.id, req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
