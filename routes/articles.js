const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

// Créer un article (protégé)
router.post('/', auth, async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Récupérer tous les articles (protégé)
router.get('/', auth, async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer un article spécifique (protégé)
router.get('/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;