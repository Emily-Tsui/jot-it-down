const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {

    const vocabWords = [
        {
            word: 'El menú',
            definition: 'menu',
            pronunciation: 'Like the English way menu.'
        },
        {
            word: 'Las revistas',
            definition: 'magazines',
            pronunciation: 'Try pronouncing the beginning r with 1 tongue roll and pronounce the s at the end.'
        },
        {
            word: 'El estudio',
            definition: 'the study',
            pronunciation: "emphasize the second syllable and the d is not a hard sounding d."
        }


    ];

    res.json(vocabWords);
})

module.exports = router;