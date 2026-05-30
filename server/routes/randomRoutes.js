// ---- Test Route ----
// const express = require('express');

// const router = express.Router();

// // Establish route so the frontend can call it. Will replace with communication to microservice instead of using hardcoded res.json {message}.
// router.get('/', function(req, res) {

//     res.json({
//         message: 'Random flashcard route working'
//     });

// });

// module.exports = router;

// ---- Test Route ---- //


const express = require('express');
const router = express.Router();
const zmq = require('zeromq');

router.get('/:range', async function(req, res) {

    const sock = new zmq.Request();

    try {

        sock.connect("tcp://localhost:8721");

        await sock.send(req.params.range);

        const [result] = await sock.receive();

        res.json({
            randomNumber: result.toString()
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Microservice communication failed'
        });

    } finally {

        sock.close();

    }

});

module.exports = router;