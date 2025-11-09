const express = require('express');
const router = express.Router();
const Participante = require('../models/Participantes.js');

// GET /api/listado/all
router.get('/listado/all', async (req, res) => {
  const lista = await Participante.findAll();
  res.json(lista);
});

// GET /api/listado?q=...
router.get('/listado', async (req, res) => {
  const { q } = req.query;
  const lista = await Participante.findAll({
    where: q ? {
      [require('sequelize').Op.or]: [
        { nombre: { [require('sequelize').Op.like]: `%${q}%` } },
        { email: { [require('sequelize').Op.like]: `%${q}%` } }
      ]
    } : {}
  });
  res.json(lista);
});

// GET /api/participante/:id
router.get('/participante/:id', async (req, res) => {
  const participante = await Participante.findByPk(req.params.id);
  if (!participante) return res.status(404).json({ message: 'Participante no encontrado' });
  res.json(participante);
});

// POST /api/registro
router.post('/registro', async (req, res) => {
  try {
    const participante = await Participante.create(req.body);
    res.json({ message: 'Participante registrado', participante });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/eliminar/:id
router.delete('/eliminar/:id', async (req, res) => {
  const participante = await Participante.findByPk(req.params.id);
  if (!participante) return res.status(404).json({ message: 'No existe el participante' });
  await participante.destroy();
  res.json({ message: 'Participante eliminado correctamente' });
});

module.exports = router;
