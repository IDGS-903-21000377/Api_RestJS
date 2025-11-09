// app.js
require('dotenv').config(); // debe ir primero
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const participantesRouter = require('./routes/participantes');

const app = express();
const PORT = process.env.PORT || 8090;

// Middleware
app.use(cors({ origin: '*' })); // durante desarrollo, luego restringe a tu frontend
app.use(bodyParser.json());
app.use('/api', participantesRouter);

// Conexión a la base de datos usando URL completa
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    // si tu DB en Railway requiere SSL, descomenta estas líneas:
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false
    // }
  },
  logging: false
});

// Sincronizar modelos y levantar servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('DB conectada y sincronizada');
    app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error DB:', err);
  });
