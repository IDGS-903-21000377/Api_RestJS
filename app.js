const express = require('express');
const cors = require('cors');
const participantesRouter = require('./routes/participantes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8090;

// ⚡ Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // React Vite
app.use(express.json());

// Rutas
app.use('/api', participantesRouter);

// Iniciar DB y servidor
sequelize.sync({ alter: false, force:false }).then(() => {
  console.log('DB sincronizada');
  app.listen(PORT, () => console.log(`Server corriendo en http://localhost:${PORT}`));
}).catch(err => console.error('Error DB:', err));
