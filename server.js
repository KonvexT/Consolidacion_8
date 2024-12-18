const conexion = require("./config/db.config");
const express = require('express');
const userRoutes = require('./routes/user.routes.js');
const bootcampRoutes = require('./routes/bootcamp.routes.js');

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',userRoutes, bootcampRoutes)

app.get('/', (req, res) => {
  res.send('Funciona')
});

(async () => {
  try {
    await conexion.sync({ alter: true })
    console.log('conectado correctamente')
    
    app.listen(port, () => {
      console.log(`Servidor a traves del puerto ${port}`)
    })
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message)
  }
})()