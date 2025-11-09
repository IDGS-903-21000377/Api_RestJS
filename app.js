require('dotenv').config(); // primero siempre
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./config/database'); // nuestra DB
const participantesRouter = require('./routes/participantes');

const app = express();
const PORT = process.env.PORT || 8090;

// Middlewares
app.use(cors({ origin: "*" })); // durante desarrollo
app.use(bodyParser.json());
app.use('/api', participantesRouter);

// Conectar DB y arrancar servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('DB conectada y sincronizada');
    app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error DB:', err));
