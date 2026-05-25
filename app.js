const express = require('express');

const app = express();

const PORT = 3080;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
    console.log(`Server running on port ${PORT}`);
});