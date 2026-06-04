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
    const userId = req.query.userId;
    db.all(
    `SELECT * FROM vocabulary WHERE user_id = ?`,
    [userId],
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

    // console.log(req.body);

    // vocabWords.push(req.body);

    db.run(
    `
    INSERT INTO vocabulary
    (user_id, word, definition, pronunciation)
    VALUES (?, ?, ?, ?)
    `,
    [
        req.body.userId,
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

    // Helps show in the node terminal the database data with id as a reference only
    db.all(`
        SELECT * FROM vocabulary
    `, (err, rows) => {

        if (err) {
            console.log(err.message);
        } else {
            console.log(rows);
        }

    });

    // res.json({
    //     message: 'Vocabulary received successfully'
    // });
});

router.delete('/:id', function(req, res) {

    db.run(
        `
        DELETE FROM vocabulary
        WHERE id = ?
        `,
        [req.params.id],
        function(err) {

            if (err) {

                console.log(err.message);

                return res.status(500).json({
                    message: 'Delete failed'
                });

            }

            res.json({
                message: 'Vocabulary deleted successfully'
            });

        }
    );

});

router.put('/:id', function(req, res) {

    db.run(
        `
        UPDATE vocabulary
        SET word = ?,
            definition = ?,
            pronunciation = ?
        WHERE id = ?
        `,
        [
            req.body.word,
            req.body.definition,
            req.body.pronunciation,
            req.params.id
        ],
        function(err) {

            if (err) {

                console.log(err.message);

                return res.status(500).json({
                    message: 'Update failed'
                });

            }

            res.json({
                message: 'Vocabulary updated successfully'
            });

        }
    );

});


module.exports = router;