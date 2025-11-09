require('dotenv').config(); // debe ir arriba, antes de cualquier uso de process.env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database'); // tu archivo de Sequelize
const participantesRouter = require('./routes/participantes');

const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use('/api', participantesRouter);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('DB conectada y sincronizada');
    app.listen(PORT, () => console.log(`Server corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error DB:', err));
