const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', function(req, res) {

    db.all(
        `
        SELECT * FROM phrases
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

    db.run(
        `
        INSERT INTO phrases
        (phrase, definition, pronunciation)
        VALUES (?, ?, ?)
        `,
        [
            req.body.phrase,
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
                message: 'Phrase saved successfully',
                id: this.lastID
            });

        }
    );

});

router.delete('/:id', function(req, res) {

    db.run(
        `
        DELETE FROM phrases
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
                message: 'Phrase deleted successfully'
            });

        }
    );

});

router.put('/:id', function(req, res) {

    db.run(
        `
        UPDATE phrases
        SET phrase = ?,
            definition = ?,
            pronunciation = ?
        WHERE id = ?
        `,
        [
            req.body.phrase,
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
                message: 'Phrase updated successfully'
            });

        }
    );

});

module.exports = router;