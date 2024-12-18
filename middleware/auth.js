const JWT_SECRET_KEY = 'J1s4nW2Bt4k2n#2024'
const SALT_ROUNDS = 10
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(403).json({ message: 'Token is required' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) // Verificar el token
    req.userId = decoded.id // Guardar el ID del usuario en la solicitud
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = { JWT_SECRET_KEY, SALT_ROUNDS, verifyToken }
