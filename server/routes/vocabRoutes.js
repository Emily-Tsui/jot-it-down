const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

    const vocabWords = [
        {
            word: 'Hola',
            definition: 'Hello'
        },
        {
            word: 'Hasta Luego',
            definition: 'See you later'
        }
    ];

    res.json(vocabWords);
})

module.exports = router;