const express = require('express');
const router = express.Router();
const zmq = require('zeromq');

router.get('/', async function(req, res) {

    const sock = new zmq.Request();

    try {

        sock.connect("tcp://localhost:5557");

        await sock.send("quote");

        const [result] = await sock.receive();

        const quoteData = JSON.parse(
            result.toString()
        );

        res.json(quoteData);

    }
    catch(error) {

        console.log(error);

        res.status(500).json({
            message: 'Microservice communication failed'
        });

    }
    finally {

        sock.close();

    }

});

module.exports = router;