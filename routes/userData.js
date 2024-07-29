const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/', auth, async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = await User.findById(req.user.id);
    user.userData = user.userData || [];
    user.userData.push({ name, age, timestamp: new Date() });
    await user.save();
    res.json({ message: 'Données reçues avec succès', data: { name, age } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.userData || []);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;