const express = require('express');
const router = express.Router();
const db = require('../database/db'); //import database connection

// let vocabWords = [
//         {
//             word: 'El menú',
//             definition: 'menu',
//             pronunciation: 'Like the English way menu.'
//         },
//         {
//             word: 'Las revistas',
//             definition: 'magazines',
//             pronunciation: 'Try pronouncing the beginning r with 1 tongue roll and pronounce the s at the end.'
//         },
//         {
//             word: 'El estudio',
//             definition: 'the study',
//             pronunciation: "emphasize the second syllable and the d is not a hard sounding d."
//         }


//     ];

router.get('/', function(req, res) {

    // res.json(vocabWords);

    db.all(
    `
    SELECT * FROM vocabulary
    `,
    [],
        (err, rows) => {

            if (err) {
                console.log(err.message);

                return res.status(500).json({
                    message: 'Database query failed'
                });
            }

            res.json(rows);

        }
    );

});

router.post('/', function(req, res) {

    console.log(req.body);

    // vocabWords.push(req.body);

    db.run(
    `
    INSERT INTO vocabulary
    (word, definition, pronunciation)
    VALUES (?, ?, ?)
    `,
    [
        req.body.word,
        req.body.definition,
        req.body.pronunciation
    ],
    function(err) {

        if (err) {
            console.log(err.message);

            return res.status(500).json({
                message: 'Database insert failed'
            });
        }

        res.json({
            message: 'Vocabulary saved successfully',
            id: this.lastID
        });

    }
    );

    // res.json({
    //     message: 'Vocabulary received successfully'
    // });
});


module.exports = router;